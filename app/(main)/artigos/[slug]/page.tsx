import { getArtigoBySlug } from '@/actions/artigo';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Chip, Divider, Avatar } from '@mui/material';
import { ArtigoViewer } from '@/src/components/artigo/artigo-viewer'; // Removido a extensão .tsx do import (boa prática)
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

// Cores da Domus
const DOMUS_GOLD = '#ebd127';

// Definição do tipo para as Props, onde params é uma Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  // 1. Aguarda a resolução dos params
  const { slug } = await params;
  
  const artigo = await getArtigoBySlug(slug);
  if (!artigo) return { title: 'Artigo não encontrado' };
  
  return {
    title: `${artigo.titulo} | Domus Solis`,
    description: artigo.subtitulo || artigo.titulo,
  };
}

export default async function ArtigoPage({ params }: Props) {
  // 1. Aguarda a resolução dos params antes de usar o slug
  const { slug } = await params;

  // 2. Busca os dados no servidor
  const artigo = await getArtigoBySlug(slug);

  // 3. Se não achar, retorna 404
  if (!artigo) {
    notFound();
  }

  // Formata a data
  const dataFormatada = new Date(artigo.created_at).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        
        {/* --- CABEÇALHO DO ARTIGO --- */}
        <Box component="header" mb={4}>
          
          {/* Título */}
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              color: '#1f2937', 
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2
            }}
          >
            {artigo.titulo}
          </Typography>

          {/* Subtítulo (se existir) */}
          {artigo.subtitulo && (
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                color: '#6b7280', 
                fontWeight: 400, 
                mb: 3,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                lineHeight: 1.4
              }}
            >
              {artigo.subtitulo}
            </Typography>
          )}

          {/* Área de Metadados (Categorias e Autor) */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              gap: 2,
              mt: 3
            }}
          >
            {/* Esquerda: Autor e Data */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: DOMUS_GOLD, color: '#1f2937' }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                  {artigo.autor_nome || 'Equipe Domus'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#9ca3af' }}>
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.85rem' }}>
                    {dataFormatada}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Direita: Categorias */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {artigo.categorias_list && artigo.categorias_list.map((cat: any) => (
                <Chip 
                  key={cat.id} 
                  label={cat.nome} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#f3f4f6', 
                    fontWeight: 600,
                    color: '#4b5563',
                    '&:hover': { bgcolor: '#e5e7eb' }
                  }} 
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 6, borderColor: '#e5e7eb' }} />

        {/* --- CONTEÚDO QUILL --- */}
        <Box component="article">
          <ArtigoViewer content={artigo.conteudo} />
        </Box>

      </Container>
    </main>
  );
}