import Link from 'next/link';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import { Playfair_Display, Inter } from 'next/font/google';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

// Configuração das fontes (mesma da Home)
const serifFont = Playfair_Display({ subsets: ['latin'], weight: ['700', '400'] });
const sansFont = Inter({ subsets: ['latin'], weight: ['300', '400'] });

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fbf7ed', // Fundo Creme Claro (Hero da Home)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Stack alignItems="center" spacing={3}>
          
          {/* Ícone Decorativo */}
          <Box sx={{ color: '#d4bd23', opacity: 0.8, mb: 2 }}>
             <AutoAwesomeOutlinedIcon sx={{ fontSize: 60 }} />
          </Box>

          {/* Número do Erro */}
          <Typography
            variant="h1"
            className={serifFont.className}
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: '700',
              fontFamily: 'serif',
              color: 'rgba(43, 27, 18, 0.1)', // Marrom muito claro, quase marca d'água
              lineHeight: 1,
              userSelect: 'none'
            }}
          >
            404
          </Typography>

          {/* Título Temático */}
          <Typography
            variant="h4"
            component="h2"
            className={serifFont.className}
            sx={{
              color: '#2b1b12', // Marrom escuro da Domus
              fontFamily: 'serif',
              fontWeight: 'bold',
              mt: -2 // Ajuste visual para aproximar do número
            }}
          >
            Os astros não se alinharam aqui.
          </Typography>

          {/* Texto Explicativo Metafísico */}
          <Typography
            variant="body1"
            className={sansFont.className}
            sx={{
              color: '#5c4a3d',
              fontFamily: sansFont.style.fontFamily,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '450px'
            }}
          >
            A página que você procura parece ter desaparecido no horizonte ou nunca existiu neste plano.
          </Typography>

          {/* Botão de Retorno */}
          <Box sx={{ pt: 4 }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#2b1b12',
                  borderColor: '#2b1b12',
                  borderRadius: 20,
                  textTransform: 'none',
                  fontFamily: sansFont.style.fontFamily,
                  fontWeight: 500,
                  px: 5,
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ebd127', // Dourado Domus
                    backgroundColor: '#2b1b12',
                    color: '#ebd127', // Texto Dourado no Hover
                    boxShadow: '0 4px 12px rgba(43, 27, 18, 0.2)'
                  }
                }}
              >
                Retornar ao Início
              </Button>
            </Link>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}