'use server';

import { Artigo, Categoria } from '@/src/models.tsx';
import pool from '@/src/db.ts';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slug from 'slug';
import { getSession } from "@/app/lib/session";

const ITEMS_PER_PAGE = 20;

const stringToArrayNonEmpty = z.string()
  .transform(val => val ? val.split(',').filter(Boolean).map(x => parseInt(x)) : [])
  .refine(arr => arr.length > 0, {
    message: 'Pelo menos uma categoria deve ser selecionada.',
  });

// --- SCHEMAS ZOD ---

const CreateArtigoSchema = z.object({
  created_by: z.string().min(0, { message: "ID da sessão é inválido." }),
  titulo: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
  subtitulo: z.string().optional(), // Adicionado subtitulo opcional
  conteudo: z.string().min(10, { message: "O conteúdo deve ter pelo menos 10 caracteres." }),
  categorias: stringToArrayNonEmpty,
});

const UpdateArtigoSchema = z.object({
  id: z.string().min(0, { message: "ID do artigo é inválido." }),
  titulo: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
  subtitulo: z.string().optional(), // Adicionado subtitulo opcional
  conteudo: z.string().min(10, { message: "O conteúdo deve ter pelo menos 10 caracteres." }),
  categorias: stringToArrayNonEmpty,
});

export interface FormState {
  message: string;
  errors?: { [key: string]: string[] | undefined };
  success: boolean;
}

// --- LEITURA (GET) ---
export async function fetchRecentArticles() {
  try {
    const query = `
      SELECT id, titulo, subtitulo, slug, created_at
      FROM artigos
      ORDER BY created_at DESC
      LIMIT 4
    `;
    
    const result = await pool.query(query);
    return result.rows as Artigo[];
  } catch (error) {
    console.error('Erro ao buscar artigos recentes:', error);
    return [];
  }
}
export async function getArtigoBySlug(slugInput: string) {
  try {
    // Query atualizada para buscar o autor E as categorias (agrupadas em um array JSON)
    const query = `
      SELECT 
        a.*, 
        u.nome as autor_nome,
        COALESCE(
          json_agg(json_build_object('id', c.id, 'nome', c.nome)) 
          FILTER (WHERE c.id IS NOT NULL), 
          '[]'
        ) as categorias_list
      FROM artigos a
      LEFT JOIN usuarios u ON a.created_by = u.id
      LEFT JOIN artigo_categorias ac ON a.id = ac.artigo_id
      LEFT JOIN categorias c ON ac.categoria_id = c.id
      WHERE a.slug = $1
      GROUP BY a.id, u.nome
    `;
    
    const result = await pool.query(query, [slugInput]);
    
    // É necessário fazer o cast ou garantir que o tipo no front receba categorias_list
    return result.rows[0] as (Artigo & { autor_nome: string, categorias_list: Categoria[] }) || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artigo by slug.');
  }
}

export async function fetchArtigosByPage(page: number, query: string = ''): Promise<{ 
  artigos: Artigo[]; 
  totalCount: number; 
}> {
  const currentPage = Math.max(page, 1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchQuery = `%${query}%`;

  try {
    const queryText = `
      SELECT
        artigos.id,
        artigos.titulo,
        artigos.subtitulo, -- Adicionado subtitulo na seleção
        artigos.slug,
        artigos.conteudo,
        artigos.created_at,
        artigos.updated_at,
        artigos.created_by,
        COALESCE(ARRAY_AGG(DISTINCT ac.categoria_id), '{}') AS categorias,
        COUNT(*) OVER() AS total_count
      FROM
        artigos
      LEFT JOIN
        artigo_categorias ac ON artigos.id = ac.artigo_id
      WHERE
        artigos.titulo ILIKE $1 
      GROUP BY
        artigos.id 
      ORDER BY
        artigos.created_at DESC
      LIMIT $2 OFFSET $3;
    `;

    const result = await pool.query(queryText, [searchQuery, ITEMS_PER_PAGE, offset]);

    const artigos = result.rows as Artigo[];
    const totalCount = parseInt(result.rows[0]?.total_count || '0', 10);

    return { artigos, totalCount };

  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    return {
      artigos: [],
      totalCount: 0,
    };
  }
}

// --- DELETE ---

export async function deleteArtigo(id: number | string) {
  if (!id) {
    return { success: false, message: 'ID do artigo é inválido.' };
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const deleteQuery = 'DELETE FROM artigos WHERE id = $1';
    await client.query(deleteQuery, [id]);
    await client.query('COMMIT');
    
    revalidatePath('/admin/artigos');
    return { success: true, message: 'Artigo deletado com sucesso.' };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro de banco de dados ao deletar artigo:', error);
    return { success: false, message: 'Falha ao deletar o artigo.' };
  } finally {
    client.release();
  }
}

// --- CREATE ---

export async function createArtigo(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CreateArtigoSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!validatedFields.success) {
    return { success: false, message: 'Erro de validação.', errors: validatedFields.error.flatten().fieldErrors };
  }
  
  const { titulo, subtitulo, conteudo, categorias, created_by } = validatedFields.data;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const insertQuery = `
      INSERT INTO artigos (titulo, subtitulo, slug, conteudo, created_by, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
      RETURNING id;
    `;
    
    // Adicionado subtitulo na query de insert
    const result = await client.query(insertQuery, [titulo, subtitulo || '', slug(titulo), conteudo, created_by]);
    const newArtigoId = result.rows[0].id;

    for (const catId of categorias) {
      await client.query('INSERT INTO artigo_categorias (artigo_id, categoria_id) VALUES ($1, $2)', [newArtigoId, catId]);
    }

    await client.query('COMMIT');

    revalidatePath('/admin/artigos');
    return { success: true, message: 'Artigo criado com sucesso!' };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Erro ao criar artigo:", error);
    return { success: false, message: 'Erro de banco de dados: Não foi possível criar o artigo.' };
  } finally {
    client.release();
  }
}

// --- UPDATE ---

export async function updateArtigo(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = UpdateArtigoSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: 'Erro de validação.', errors: validatedFields.error.flatten().fieldErrors };
  }
  
  const { id, titulo, subtitulo, conteudo, categorias } = validatedFields.data;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const updateQuery = `
      UPDATE artigos 
      SET titulo = $1, subtitulo = $2, slug = $3, conteudo = $4, updated_at = NOW()
      WHERE id = $5;
    `;
    // Adicionado subtitulo na query de update
    await client.query(updateQuery, [titulo, subtitulo || '', slug(titulo), conteudo, id]);

    await client.query('DELETE FROM artigo_categorias WHERE artigo_id = $1', [id]);
    for (const catId of categorias) {
      await client.query('INSERT INTO artigo_categorias (artigo_id, categoria_id) VALUES ($1, $2)', [id, catId]);
    }

    await client.query('COMMIT');

    revalidatePath('/admin/artigos');
    return { success: true, message: 'Artigo atualizado com sucesso!' };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Erro ao atualizar artigo:", error);
    return { success: false, message: 'Erro de banco de dados: Não foi possível atualizar o artigo.' };
  } finally {
    client.release();
  }
}