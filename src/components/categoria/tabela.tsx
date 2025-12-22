'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  type AlertColor,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Categoria } from '@/src/models.tsx'; // Importando seu tipo Categoria
import { deleteCategoria } from '@/actions/categoria.ts'; // Action de deletar categoria
import { CategoriaFormModal } from './modal.tsx'; // Importa o modal atualizado

// Configuração das cores da Domus
const DOMUS_GOLD = '#ebd127';
const DOMUS_GOLD_HOVER = '#d4bd23';
const TEXT_ON_GOLD = '#1f2937'; 

interface CategoriaTableProps {
  categorias: Categoria[];
  totalCount: number;
}

const ITEMS_PER_PAGE = 20;

export function CategoriasTable({ categorias, totalCount }: CategoriaTableProps) {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); 
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    router.replace(`?${params.toString()}`);
  };

  const handleOpenCreateModal = () => {
    setEditingCategoria(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setIsFormModalOpen(true);
  };
  
  const handleFormSuccess = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleOpenDeleteDialog = (categoria: Categoria) => {
    setCategoriaToDelete(categoria);
    setDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDialogOpen(false);
    setCategoriaToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!categoriaToDelete) return;

    const result = await deleteCategoria(categoriaToDelete.id);
    
    setSnackbarMessage(result.message);
    setSnackbarSeverity(result.success ? 'success' : 'error');
    setSnackbarOpen(true);

    handleCloseDeleteDialog();
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };
  
  const page = (Number(searchParams.get('page')) || 1) - 1;

  const handleChangePage = (event: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (newPage + 1).toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Box>
      <Toolbar sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          borderRadius: 2,
          mb: 2,
          boxShadow: 1
        }} >
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="div">
          Categorias
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por nome..."
            defaultValue={searchParams.get('query') || ''}
            onChange={(e) => {
              const timeoutId = setTimeout(() => {
                handleSearch(e.target.value);
              }, 300);
              return () => clearTimeout(timeoutId);
            }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
              sx: { borderRadius: '20px', fontSize: '0.875rem' }
            }}
          />
          <IconButton title="Filtrar lista"><FilterListIcon /></IconButton>
          <Button 
            variant="contained" 
            onClick={handleOpenCreateModal}  
            startIcon={<AddIcon />} 
            sx={{ 
                bgcolor: DOMUS_GOLD, 
                color: TEXT_ON_GOLD,
                borderRadius: '20px', 
                px: 3, 
                textTransform: 'none', 
                fontWeight: 'bold', 
                '&:hover': { bgcolor: DOMUS_GOLD_HOVER } 
            }}
          >
            Criar
          </Button>
        </Box>
      </Toolbar>

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, boxShadow: 1 }}>
        <TableContainer>
          <Table stickyHeader aria-label="Tabela de Categorias">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '120px' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell>{categoria.nome || '-'}</TableCell>
                  <TableCell>{categoria.descricao || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEditModal(categoria)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleOpenDeleteDialog(categoria)}><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {categorias.length === 0 && (
                <TableRow><TableCell colSpan={3} align="center">Nenhuma categoria encontrada.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={ITEMS_PER_PAGE}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        />
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>{"Confirmar Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar permanentemente a categoria
            <strong>{` ${categoriaToDelete?.nome || ''}`}</strong>? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{color: '#666'}}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      {isFormModalOpen && (
        <CategoriaFormModal
          open={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSuccess={handleFormSuccess}
          editingCategoria={editingCategoria}
        />
      )}

    </Box>
  );
}