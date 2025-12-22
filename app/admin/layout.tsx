import { Box, CssBaseline } from '@mui/material';
import { AdminSidebar } from '@/src/admin_menu'; // Verifique se o caminho de importação está correto
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from 'next'; // Importação do tipo Metadata

export const metadata: Metadata = {
  title: "Painel de Controle | Domus Solis",
  description: "Área de administração",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proteção de rota no layout de admin
  const session = await getSession();
  
  if (!session?.id) {
    redirect('/'); // Redireciona para a home se não for admin nem autor
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f9fafb' }}> 
        {/* Menu Lateral */}
        <AdminSidebar userSession={session} />
        
        {/* Conteúdo Principal da Administração */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` }, // Ajusta a largura
            overflowY: 'auto', // Permite scroll apenas no conteúdo, sidebar fixa
            height: '100vh'
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}