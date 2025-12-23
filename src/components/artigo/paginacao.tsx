'use client';

import { Pagination, Box } from '@mui/material';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginacaoProps {
  totalPages: number;
}

export function Paginacao({ totalPages }: PaginacaoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Pega a página atual da URL ou assume 1
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Cria novos parâmetros de busca mantendo os existentes (ex: query de busca)
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    
    // Atualiza a URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={handleChange} 
        color="primary"
        sx={{
          '& .Mui-selected': {
            bgcolor: '#ebd127 !important', // Domus Gold
            color: '#1f2937', // Text on Gold
            fontWeight: 'bold'
          }
        }}
      />
    </Box>
  );
}