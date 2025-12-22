import { UsersTable } from '@/src/components/usuario/tabela.tsx';
import { 
  Box, 
  Typography, 
} from '@mui/material';
import { fetchUsersByPage } from '@/actions/usuario.ts';
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";


export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    query?: string;
  };
}) {
  //const currentPage = Number( searchParams?.page) || 1;
  const session = await getSession();
  if (!session?.id) {
    redirect('/'); // Redireciona para a home se não for admin
  }
  const {page, query} = await searchParams;
  // Chama a Server Action para buscar os dados da página atual
  const { users, totalCount } = await fetchUsersByPage(page  || 1, query);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Gerenciamento de Usuários
      </Typography>
      
      {/* Renderiza a tabela passando os dados buscados como props */}
      <UsersTable 
        users={users}
        totalCount={totalCount} 
      />
    </Box>
  );
}