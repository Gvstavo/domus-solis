// Este é um Componente de Servidor por padrão.
// O layout 'admin/layout.tsx' já faz a verificação de admin.
import { ArtigosTable } from '@/src/components/artigo/tabela.tsx';
import { 
  Box, 
  Typography, 
} from '@mui/material';
import { fetchArtigosByPage } from '@/actions/artigo.ts';
import {fetchAllCategorias} from '@/actions/categoria.ts';
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function AdminGenerosPage({
  searchParams,
}: {
  // Recebemos os parâmetros da URL para saber qual página buscar
  searchParams?: {
    page?: string;
    limit?: string;
    query?: string;

  };
}) {
  const session = await getSession();
  if (!session?.id) {
    redirect('/'); // Redireciona para a home se não for admin
  }
  const {page, query} = await searchParams;
  // Chama a Server Action para buscar os dados da página atual
  const { artigos, totalCount } = await fetchArtigosByPage(page  || 1, query);
  const {categorias} = await fetchAllCategorias();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Gerenciamento de Artigos
      </Typography>
      
      {/* Renderiza a tabela passando os dados buscados como props */}
      <ArtigosTable 
        artigos={artigos}
        categorias={categorias}
        totalCount={totalCount} 
        currentUserId={session.id}
      />
    </Box>
  );
}