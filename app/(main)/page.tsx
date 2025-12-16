import { Box, Typography, Container, Stack, Card, CardContent, Grid, Button } from "@mui/material";
import Image from "next/image";
// Ícones
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// Se estiver usando next/font, mantenha os imports.
import { Playfair_Display, Inter } from 'next/font/google';

const serifFont = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const sansFont = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

// Dados das categorias
const categories = [
  {
    title: "Astrologia Natal",
    description: "Análise astrológica de figuras históricas e personagens públicos. Mapeamento do céu natal como chave para compreender a natureza profunda.",
  },
  {
    title: "Metafísica Astrológica",
    description: "Investigação dos princípios simbólicos e metafísicos que governam os eventos históricos e a lógica oculta que rege transformações.",
  },
  {
    title: "Fenomenologia",
    description: "Exame da experiência vivida e sua essência nos acontecimentos históricos. Investigação de como os eventos se manifestam.",
  },
  {
    title: "Metapolítica e Metahistória",
    description: "Investigação da linguagem universal dos símbolos e como as narrativas transcendentes moldam a realidade política.",
  }
];

// Dados dos Artigos Recentes
const recentArticles = [
  {
    title: "A Fenomenologia da Ascensão de Hitler: Padrões Cósmicos e Catástrofe Histórica",
    excerpt: "Análise fenomenológica de como os padrões astrológicos de 1933 revelam a essência da ascensão do nazismo, demonstrando como eventos históricos catastróficos são...",
    date: "5 de dezembro de 2024"
  },
  {
    title: "A Revolução Francesa: O Caos Cósmico e a Reorganização da Ordem",
    excerpt: "Investigação fenomenológica de como a Revolução Francesa, analisada através dos trânsitos planetários de 1789, revela a manifestação de padrões astrológicos em transformações...",
    date: "7 de dezembro de 2024"
  },
  {
    title: "Napoleão Bonaparte: O Conquistador do Destino Cósmico",
    excerpt: "Análise da carta natal de Napoleão e como seus padrões astrológicos revelam a natureza de sua ascensão e queda, demonstrando a lógica simbólica que governou seu destino...",
    date: "9 de dezembro de 2024"
  },
];

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- SEÇÃO 1: HERO (Fundo Creme Claro) --- */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#fbf7ed',
          width: '100%',
          py: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center' }}>
            
            {/* Logo Image */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#ffeec9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(246, 160, 0, 0.15)',
              }}
            >
              <Image
                src="/domus-solis.png"
                alt="Logo Domus Solis"
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Título */}
            <Typography
              variant="h2"
              component="h1"
              className={serifFont.className}
              sx={{
                color: '#2b1b12',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontFamily: 'serif',
              }}
            >
              Domus Solis
            </Typography>

            {/* Subtítulo */}
            <Typography
              variant="subtitle1"
              className={sansFont.className}
              sx={{
                color: '#5c4a3d',
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                mb: 2
              }}
            >
              O Domo do Sol
            </Typography>

            {/* Texto Descritivo */}
            <Typography
              variant="body1"
              className={sansFont.className}
              sx={{
                color: '#2b1b12',
                maxWidth: '600px',
                lineHeight: 1.6,
                fontSize: '1rem',
                mt: 2,
              }}
            >
              Um espaço sagrado onde as coisas, palavras e significados brilham.
              <br />
              Anotações pessoais sobre Astrologia Natal, Metafísica Astrológica,
              <br />
              Fenomenologia e Simbolismos variados.
            </Typography>

            <Typography
              variant="body2"
              className={sansFont.className}
              sx={{
                color: '#6d5b4f',
                fontStyle: 'italic',
                mt: 4,
                pt: 2
              }}
            >
              Especulações, impressões, imagens e testemunhos
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* --- SEÇÃO 2: CATEGORIAS (Fundo Mais Escuro #f4efe6) --- */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#f4efe6',
          width: '100%',
          py: 12,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 8 } }}>
          <Stack spacing={6}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center"
              className={serifFont.className}
              sx={{ 
                color: '#2b1b12', 
                fontFamily: 'serif', 
                fontWeight: 'bold' 
              }}
            >
              Categorias
            </Typography>

            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={3} 
              alignItems="stretch" 
              justifyContent="center"
            >
              {categories.map((cat, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    flex: 1,
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff', // Cards Brancos
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.05)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: '#f6a000',
                      boxShadow: '0 12px 24px rgba(43, 27, 18, 0.08)', 
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'left' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      className={serifFont.className}
                      sx={{ 
                        color: '#2b1b12', 
                        fontFamily: 'serif', 
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        mb: 2
                      }}
                    >
                      {cat.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      className={sansFont.className}
                      sx={{ 
                        color: '#5c4a3d',
                        lineHeight: 1.6,
                        fontFamily: sansFont.style.fontFamily,
                        fontSize: '0.9rem',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 5, 
                      }}
                    >
                      {cat.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* --- SEÇÃO 3: ARTIGOS RECENTES (Fundo Muito Claro #fdfbf7) --- */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#fdfbf7', // Tom bem claro, quase branco
          width: '100%',
          py: 12,
        }}
      >
<Container maxWidth="xl" sx={{ px: { xs: 2, md: 8 } }}>
        <Stack spacing={6} alignItems="center">
          <Typography 
            variant="h4" 
            component="h2" 
            align="center"
            className={serifFont.className}
            sx={{ 
              color: '#2b1b12', 
              fontFamily: 'serif', 
              fontWeight: 'bold' 
            }}
          >
            Artigos Recentes
          </Typography>

          {/* SUBSTITUIÇÃO DO GRID:
            Usando Box com display: flex para layout fluido e 'aspectRatio' para quadrados.
          */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap', // Permite quebrar linha
              justifyContent: 'center', // Centraliza os itens
              gap: 3, // Espaçamento entre os quadrados
              width: '100%',
            }}
          >
            {recentArticles.map((article, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  // Flex: Cresce (1), Encolhe (1), Base (350px).
                  // Isso ajusta automaticamente quantos cabem na linha sem usar Grid colunas fixas.
                  flex: '1 1 300px', 
                  maxWidth: '450px', // Limite máximo para não ficar gigante em telas wide
                  
                  aspectRatio: '1 / 1', // --- FORÇA O QUADRADO PERFEITO ---
                  
                  backgroundColor: '#f4efe6',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    p: 4, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      className={serifFont.className}
                      sx={{ 
                        color: '#2b1b12', 
                        fontFamily: 'serif', 
                        fontWeight: 'bold',
                        lineHeight: 1.3,
                        mb: 2,
                        // Limita o título a 3 linhas para não estourar o quadrado
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                    >
                      {article.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      className={sansFont.className}
                      sx={{ 
                        color: '#5c4a3d', 
                        lineHeight: 1.6,
                        mb: 2,
                        // Limita o texto para caber no quadrado
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4, // Ajuste conforme necessário
                      }}
                    >
                      {article.excerpt}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ color: '#6d5b4f', opacity: 0.8, mt: 'auto' }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.85rem' }}>
                      {article.date}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Botão Ver Todos */}
          <Button 
            variant="outlined" 
            sx={{ 
              mt: 4,
              color: '#2b1b12',
              borderColor: '#dcd6cb',
              borderRadius: 20,
              textTransform: 'none',
              fontFamily: sansFont.style.fontFamily,
              px: 4,
              py: 1,
              '&:hover': {
                borderColor: '#2b1b12',
                backgroundColor: 'rgba(43, 27, 18, 0.04)'
              }
            }}
          >
            Ver Todos os Artigos
          </Button>

        </Stack>
      </Container>
      </Box>

    </Box>
  );
}