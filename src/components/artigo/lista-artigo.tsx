import { fetchArtigosByPage } from '@/actions/artigo';
import { Box, Typography, Card, CardContent, Divider, Chip, Container } from '@mui/material';
import Link from 'next/link';
import { Paginacao } from './paginacao';

interface ListaArtigosProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

const DOMUS_GOLD = '#ebd127';
const ITEMS_PER_PAGE = 20; // Deve ser o mesmo valor definido na sua action

export async function ListaArtigos({ searchParams }: ListaArtigosProps) {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';

  // Busca os dados no servidor (já ordenados por data DESC na action)
  const { artigos, totalCount } = await fetchArtigosByPage(page, query);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Formatador de data
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {artigos.length === 0 ? (
           <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
             Nenhum artigo encontrado.
           </Typography>
        ) : (
          artigos.map((artigo) => (
            <Card 
              key={artigo.id} 
              elevation={0} 
              sx={{ 
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderColor: DOMUS_GOLD
                }
              }}
            >
              <CardContent>
                {/* Data */}
                <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', fontWeight: 500 }}>
                  {artigo.created_at ? formatDate(artigo.created_at) : 'Data desconhecida'}
                </Typography>

                {/* Título com Link */}
                <Link href={`/artigos/${artigo.slug}`} style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#1f2937',
                      mb: 1,
                      '&:hover': { color: '#bca61e' } // Darker Gold
                    }}
                  >
                    {artigo.titulo}
                  </Typography>
                </Link>

                {/* Subtítulo */}
                {artigo.subtitulo && (
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                    {artigo.subtitulo}
                  </Typography>
                )}

                {/* Botão Ler Mais (Estético) */}
                <Box sx={{ mt: 2 }}>
                  <Link href={`/artigos/${artigo.slug}`} style={{ textDecoration: 'none' }}>
                     <Typography 
                        variant="button" 
                        sx={{ 
                            color: '#bca61e', 
                            fontWeight: 'bold',
                            borderBottom: '2px solid transparent',
                            '&:hover': { borderBottomColor: DOMUS_GOLD }
                        }}
                     >
                        Ler artigo completo
                     </Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Paginação */}
      {totalPages > 1 && (
        <Paginacao totalPages={totalPages} />
      )}
    </Container>
  );
}