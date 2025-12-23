import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Divider, Stack } from "@mui/material";

// Opcional: Importando fontes para ficar mais parecido com a imagem original.
// Se você já configurou essas fontes globalmente no seu tema ou layout, pode remover estas linhas.
import { Playfair_Display, Inter } from 'next/font/google';

// Configuração das fontes (remova se já estiver usando globalmente)
const serifFont = Playfair_Display({ subsets: ['latin'], weight: ['700'] });
const sansFont = Inter({ subsets: ['latin'], weight: ['400'] });

const Footer = () => {
  // Cores baseadas na paleta da imagem
  const bgColor = '#f2ede4'; // Um tom de bege ligeiramente mais escuro para o footer
  const textColor = '#5c4a3d'; // Marrom médio para texto e links
  const titleColor = '#2b1b12'; // Marrom escuro para títulos
  const linkHoverColor = '#2b1b12'; // Cor do link ao passar o mouse

  // Estilo comum para os links do rodapé
  const linkStyle = {
    color: textColor,
    textDecoration: 'none',
    '&:hover': {
      color: linkHoverColor,
      textDecoration: 'underline',
    },
    fontFamily: sansFont.style.fontFamily, // Usa a fonte sans-serif
    fontSize: '0.9rem',
  };

  // Estilo comum para os títulos das seções
  const sectionTitleStyle = {
    fontWeight: 'bold',
    color: titleColor,
    mb: 2, // Margem inferior
    fontFamily: serifFont.style.fontFamily, // Usa a fonte serifada
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        py: 6, // Padding vertical (topo e base)
        mt: 'auto', // Garante que o footer fique na parte inferior se o conteúdo for curto
      }}
    >
      <Container maxWidth="lg">
        {/* Seção Superior: 3 Colunas */}
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Coluna 1: Descrição */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={sectionTitleStyle}>
              Domus Solis
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: sansFont.style.fontFamily, lineHeight: 1.6, maxWidth: '300px' }}>
              O Domo do Sol. Um espaço sagrado onde palavras, símbolos e significados brilham.
            </Typography>
          </Grid>

          {/* Coluna 2: Navegação */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={sectionTitleStyle}>
              Navegação
            </Typography>
            <Stack spacing={1}>
              <MuiLink href="/" sx={linkStyle}>Home</MuiLink>
              <MuiLink href="/artigos" sx={linkStyle}>Artigos</MuiLink>
              <MuiLink href="/sobre" sx={linkStyle}>Sobre</MuiLink>
            </Stack>
          </Grid>

          {/* Coluna 3: Categorias */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={sectionTitleStyle}>
              Categorias
            </Typography>
            <Stack spacing={1}>
              <MuiLink href="#" sx={linkStyle}>Astrologia Natal</MuiLink>
              <MuiLink href="#" sx={linkStyle}>Metafísica Astrológica</MuiLink>
              <MuiLink href="#" sx={linkStyle}>Fenomenologia</MuiLink>
              <MuiLink href="#" sx={linkStyle}>Simbolismos</MuiLink>
            </Stack>
          </Grid>
        </Grid>

        {/* Divisor Horizontal */}
        <Divider sx={{ my: 4, borderColor: '#dcd6cb' }} />

        {/* Seção Inferior: Copyright e Créditos */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Empilha em mobile, linha em telas maiores
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: sansFont.style.fontFamily,
            fontSize: '0.85rem',
          }}
        >
          {/* Copyright */}
          <Typography variant="body2" sx={{ color: textColor, mb: { xs: 1, sm: 0 } }}>
            © {new Date().getFullYear()} Domus Solis. Todos os direitos reservados.
          </Typography>

          {/* Créditos */}
          <Typography variant="body2" sx={{ color: textColor }}>
            Escrito por <strong>Sarcone</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;