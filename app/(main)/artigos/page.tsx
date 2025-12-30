import { ListaArtigos } from '@/src/components/artigo/lista-artigo.tsx';
import { Box, Typography, Container } from '@mui/material';

export const metadata = {
  title: 'Artigos | Domus Solis',
  description: 'Leia nossos últimos artigos e novidades.',
};
export const dynamic = 'force-dynamic';
export default function ArtigosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Normaliza os params para passar para o componente
  const props = {
    page: typeof searchParams.page === 'string' ? searchParams.page : '1',
    query: typeof searchParams.query === 'string' ? searchParams.query : '',
  };

  return (
    <main>
      {/* Cabeçalho da Página */}
      <Box sx={{ bgcolor: '#f9fafb', py: 8, mb: 4, borderBottom: '1px solid #e5e7eb' }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight="bold" 
            sx={{ color: '#1f2937', mb: 2 }}
          >
            Artigos & Novidades
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight="normal">
            Explore nosso conteúdo
          </Typography>
        </Container>
      </Box>

      {/* Lista de Artigos */}
      <ListaArtigos searchParams={props} />
    </main>
  );
}