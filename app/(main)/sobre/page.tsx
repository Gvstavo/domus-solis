import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";

// Ícones
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Configuração de Fontes (assumindo uso no Next.js com next/font)
// Se não estiver usando Next.js, você pode remover isso e usar CSS global ou o tema MUI.
import { Playfair_Display, Inter } from 'next/font/google';

const serifFont = Playfair_Display({ subsets: ['latin'], weight: ['700', '400'], style: ['normal', 'italic'] });
const sansFont = Inter({ subsets: ['latin'], weight: ['300', '400', '700'] });

// Paleta de cores baseada na imagem
const colors = {
  mainBg: '#fbf7ed', // Fundo geral creme claro
  cardBg: '#f4ece2', // Fundo do card "Sobre Sarcone" (um pouco mais escuro)
  titleBrown: '#2b1b12', // Marrom escuro para títulos
  textBrown: '#4a3c31', // Marrom médio para texto corrido
  accentOrange: '#f6a000', // Laranja para ícones e destaques
};

// Estilos reutilizáveis
const sectionHeaderStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  mb: 3,
  color: colors.titleBrown,
};

const iconStyles = {
  color: colors.accentOrange,
  fontSize: 32,
};

const bodyTextStyles = {
  fontFamily: sansFont.style.fontFamily,
  color: colors.textBrown,
  lineHeight: 1.7,
  mb: 2,
};

const serifTitleStyles = {
  fontFamily: serifFont.style.fontFamily,
  fontWeight: 700,
};

const Sobre = () => {
  return (
    <Box sx={{ backgroundColor: colors.mainBg, minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        {/* Cabeçalho Principal */}
        <Stack spacing={1} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ ...serifTitleStyles, color: colors.titleBrown }}>
            Sobre Domus Solis
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: serifFont.style.fontFamily, fontStyle: 'italic', color: colors.textBrown }}>
            O Domo do Sol — um espaço sagrado onde significados brilham
          </Typography>
        </Stack>

        {/* Seção 1: O Projeto */}
        <Box component="section" sx={{ mb: 6 }}>
          <Box sx={sectionHeaderStyles}>
            <WbSunnyOutlinedIcon sx={iconStyles} />
            <Typography variant="h5" component="h2" sx={serifTitleStyles}>
              O Projeto
            </Typography>
          </Box>
          <Typography variant="body1" sx={bodyTextStyles}>
            Domus Solis é um espaço dedicado à contemplação e reflexão sobre temas que tocam a dimensão sagrada da existência. O nome evoca um domo — um espaço fechado, protegido, onde as coisas, palavras e significados podem brilhar com clareza.
          </Typography>
          <Typography variant="body1" sx={bodyTextStyles}>
            Este blog reúne anotações pessoais, especulações e impressões sobre:
          </Typography>
          
          {/* Lista com bullet points simples */}
          <List dense sx={{ mb: 2 }}>
            {[
              { title: 'Astrologia Natal:', desc: 'O mapa celeste como espelho da alma' },
              { title: 'Metafísica Astrológica:', desc: 'Os princípios ocultos que regem a existência' },
              { title: 'Fenomenologia:', desc: 'A experiência vivida e sua essência' },
              { title: 'Simbolismos:', desc: 'A linguagem universal dos símbolos' },
            ].map((item, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10, color: colors.accentOrange }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontFamily: sansFont.style.fontFamily, color: colors.textBrown }}>
                      <strong>{item.title}</strong> {item.desc}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          
          <Typography variant="body1" sx={bodyTextStyles}>
            Cada artigo é um testemunho pessoal, uma tentativa de compreender os mistérios que permeiam nossa existência através de uma lente contemplativa e, fundamentalmente, católica romana.
          </Typography>
        </Box>

        {/* Seção 2: Sobre Sarcone (Card Destacado) */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: colors.cardBg,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            mb: 6,
          }}
        >
          <Box sx={sectionHeaderStyles}>
            <FavoriteBorderIcon sx={iconStyles} />
            <Typography variant="h5" component="h2" sx={serifTitleStyles}>
              Sobre Sarcone
            </Typography>
          </Box>
          <Typography variant="body1" sx={bodyTextStyles}>
            Sarcone é o nome que escolhi para assinar este espaço de reflexão. Sou um peregrino no caminho da compreensão, movido pela curiosidade sobre os mistérios que habitam a dimensão espiritual e material da existência.
          </Typography>
          <Typography variant="body1" sx={bodyTextStyles}>
            Minha perspectiva é profundamente enraizada na fé católica romana, que oferece um fundamento sólido para a contemplação do divino. Acredito que a astrologia, a metafísica e a fenomenologia não são contraditórias à fé, mas sim ferramentas para aprofundar nossa compreensão da obra divina.
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyles, mb: 1 }}>
            Neste espaço, compartilho:
          </Typography>

          {/* Lista com setas laranjas */}
          <List dense sx={{ mb: 3 }}>
            {[
              'Reflexões pessoais sobre temas astrológicos e metafísicos',
              'Análises de símbolos e seus significados profundos',
              'Impressões e testemunhos de experiências contemplativas',
              'Especulações sobre a natureza da realidade e da consciência',
            ].map((text, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <ArrowRightIcon sx={{ color: colors.accentOrange }} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body1" sx={{ fontFamily: sansFont.style.fontFamily, color: colors.textBrown }}>{text}</Typography>}
                />
              </ListItem>
            ))}
          </List>

          {/* Citação */}
          <Typography
            variant="body1"
            sx={{
              fontFamily: serifFont.style.fontFamily,
              fontStyle: 'italic',
              color: colors.textBrown,
              pl: 2,
              borderLeft: `2px solid ${colors.accentOrange}40` // Borda sutil à esquerda
            }}
          >
            "No Domus Solis, cada palavra é um raio de luz que ilumina um aspecto do mistério divino."
          </Typography>
        </Paper>

        {/* Seção 3: Perspectiva Católica */}
        <Box component="section" sx={{ mb: 8 }}>
          <Box sx={sectionHeaderStyles}>
            <MenuBookOutlinedIcon sx={iconStyles} />
            <Typography variant="h5" component="h2" sx={serifTitleStyles}>
              Perspectiva Católica
            </Typography>
          </Box>
          <Typography variant="body1" sx={bodyTextStyles}>
            Como católico romano, compreendo que toda verdade é verdade de Deus. A criação reflete a sabedoria divina em cada detalhe, desde os movimentos dos astros até os padrões que emergem em nossas vidas.
          </Typography>
          <Typography variant="body1" sx={bodyTextStyles}>
            A astrologia e a metafísica, quando abordadas com reverência e discernimento, podem nos aproximar de uma compreensão mais profunda da ordem divina. Não se trata de determinismo fatalista, mas de reconhecer os padrões e influências que nos cercam e que, em última análise, servem ao plano divino.
          </Typography>
          <Typography variant="body1" sx={bodyTextStyles}>
            Neste espaço, buscamos sempre a verdade com humildade, reconhecendo que nossa compreensão é limitada e que o mistério divino sempre nos transcende.
          </Typography>
        </Box>

        {/* Rodapé da Página */}
        <Stack spacing={1} alignItems="center" sx={{ textAlign: 'center', mt: 8, pb: 4 }}>
          <Typography variant="h6" sx={{ ...serifTitleStyles, color: colors.titleBrown }}>
            Bem-vindo ao Domus Solis
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: serifFont.style.fontFamily, fontStyle: 'italic', color: colors.textBrown }}>
            Que cada artigo seja uma luz que ilumina seu próprio caminho de compreensão.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Sobre;