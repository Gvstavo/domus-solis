'use client';
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  IconButton
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category'; // Ícone para Categorias
import ArticleIcon from '@mui/icons-material/Article'; // Ícone para Artigos
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

// Configuração das cores da Domus
const DOMUS_GOLD = '#ebd127';
const DOMUS_GOLD_HOVER = '#d4bd23';
const TEXT_ON_GOLD = '#1f2937'; 

export function AdminSidebar({ userSession }: { userSession: any }) {
  const pathname = usePathname();
  const isAdmin = userSession?.admin;
  
  // Lista de itens do menu ATUALIZADA
  const menuItems = [
    { text: 'Usuários', icon: <PeopleIcon />, href: '/admin/usuarios', adminOnly: true },
    { text: 'Categorias', icon: <CategoryIcon />, href: '/admin/categorias', adminOnly: true },
    { text: 'Artigos', icon: <ArticleIcon />, href: '/admin/artigos', adminOnly: false },
  ];

  return (
    <Box 
      sx={{ 
        width: drawerWidth, 
        flexShrink: 0, 
        bgcolor: 'background.paper', 
        height: '100vh', 
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Topo da Sidebar (Logo) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, height: '64px' }}>
        <Link href="/" passHref style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
           <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200 mr-2">
              <Image
                src="/domus-solis.png"
                alt="Logo Domus Solis"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold text-gray-800">
              Domus Solis
            </span>
        </Link>
      </Box>
      <Divider />

      {/* Main Items */}
      <List component="nav" sx={{ pt: 2, px: 2 }}>
        <Box sx={{ mb: 2, px: 1 }}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administração
            </span>
        </Box>
        
        {menuItems.map((item) => {
          // Lógica de exibição: Se for adminOnly e o usuário não for admin, não mostra.
          //if (item.adminOnly && !isAdmin) return null;

          // Verifica se a rota atual corresponde ao href para marcar como ativo
          const isSelected = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link key={item.text} href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton
                selected={isSelected}
                sx={{ 
                  borderRadius: '8px', 
                  mb: 1,
                  '&.Mui-selected': { 
                    bgcolor: DOMUS_GOLD,
                    color: TEXT_ON_GOLD,
                    fontWeight: 'bold',
                    '& .MuiListItemIcon-root': { color: TEXT_ON_GOLD },
                    '&:hover': { bgcolor: DOMUS_GOLD_HOVER }
                  },
                  '&:hover': {
                     bgcolor: 'rgba(0, 0, 0, 0.04)' // Hover suave quando não selecionado
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: DOMUS_GOLD_HOVER
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isSelected ? TEXT_ON_GOLD : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                        fontWeight: isSelected ? 'bold' : 'medium',
                        fontSize: '0.95rem'
                    }} 
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} /> 
      
      {/* Rodapé da Sidebar (Info do Usuário) */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {userSession?.name?.charAt(0).toUpperCase() || 'U'}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{userSession?.name}</p>
                <p className="text-xs text-gray-500 truncate capitalize">{isAdmin ? 'Administrador' : 'Autor'}</p>
             </div>
        </div>
      </Box>
    </Box>
  );
}