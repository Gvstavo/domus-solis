'use server';

import { Categoria } from '@/src/models.tsx'; // Certifique-se que o caminho está correto
import pool from '@/src/db.ts';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import slug from 'slug';

const ITEMS_PER_PAGE = 20;

// Validação para Criação: Nome e Descrição
const CreateCategoriaSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  // Assumindo que descrição é obrigatória, mas pode ser um texto curto. 
  // Se for opcional, use: z.string().optional()
  descricao: z.string().min(3, { message: "A descrição deve ter pelo menos 3 caracteres." }),
});

// Validação para Atualização
const UpdateCategoriaSchema = z.object({
  id: z.string(), // IDs vindos de formulários geralmente são strings
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(3, { message: "A descrição deve ter pelo menos 3 caracteres." }),
});

// Tipagem para o estado do formulário
export interface FormState {
  message: string;
  errors?: { [key: string]: string[] | undefined };
  success: boolean;
}

// --- BUSCAR PAGINADO ---
export async function fetchCategoriasByPage(page: number, query: string = ''): Promise<{ 
  categorias: Categoria[]; 
  totalCount: number; 
}> {
  const currentPage = Math.max(page, 1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchQuery = `%${query}%`;

  try {
    const queryText = `
      SELECT
        id,
        nome,
        descricao,
        slug,
        COUNT(*) OVER() AS total_count
      FROM categorias
      WHERE nome ILIKE $1 OR descricao ILIKE $1
      ORDER BY nome ASC
      LIMIT $2 OFFSET $3;
    `;

    const result = await pool.query(queryText, [searchQuery, ITEMS_PER_PAGE, offset]);

    const categorias = result.rows as Categoria[];
    const totalCount = parseInt(result.rows[0]?.total_count || '0', 10);

    return { categorias, totalCount };

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return {
      categorias: [],
      totalCount: 0,
    };
  }
}

// --- BUSCAR TODAS (Para selects/combobox) ---
export async function fetchAllCategorias(): Promise<{ 
  categorias: Categoria[]; 
}> {
  try {
    const query = `
      SELECT
        id,
        nome,
        descricao,
        slug
      FROM categorias
      ORDER BY nome ASC
    `;
    const result = await pool.query(query);

    const categorias = result.rows as Categoria[];
    return { categorias };

  } catch (error) {
    return {
      categorias: [],
    };
  }
}

// --- DELETAR ---
export async function deleteCategoria(id: number | string) {
  if (!id) {
    return { success: false, message: 'ID da categoria é inválido.' };
  }

  try {
    const deleteQuery = 'DELETE FROM categorias WHERE id = $1';
    
    await pool.query(deleteQuery, [id]);
    revalidatePath('/admin/categorias');

    return { success: true, message: 'Categoria deletada com sucesso.' };
  } catch (error) {
    console.error('Erro de banco de dados ao deletar categoria:', error);
    return { success: false, message: 'Falha ao deletar a categoria.' };
  }
}

// --- CRIAR ---
export async function createCategoria(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CreateCategoriaSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: 'Erro de validação.', errors: validatedFields.error.flatten().fieldErrors };
  }
  
  const { nome, descricao } = validatedFields.data;

  try {
    await pool.query(
      'INSERT INTO categorias (nome, descricao, slug) VALUES ($1, $2, $3)',
      [nome, descricao, slug(nome)]
    );

    revalidatePath('/admin/categorias');
    return { success: true, message: 'Categoria criada com sucesso!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Erro de banco de dados.' };
  }
}

// --- ATUALIZAR ---
export async function updateCategoria(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = UpdateCategoriaSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: 'Erro de validação.', errors: validatedFields.error.flatten().fieldErrors };
  }
  
  const { nome, descricao, id } = validatedFields.data;

  try {
    const queryText = 'UPDATE categorias SET nome = $1, descricao = $2, slug = $3 WHERE id = $4';
    const queryParams = [nome, descricao, slug(nome), id];

    await pool.query(queryText, queryParams);    
    
    revalidatePath('/admin/categorias');
    return { success: true, message: 'Categoria atualizada com sucesso!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Erro de banco de dados.' };
  }
}