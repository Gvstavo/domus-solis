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
import { type Artigo, type Categoria } from '@/src/models.tsx';
import { deleteArtigo } from '@/actions/artigo'; // Importando action de Artigo
import { ArtigoFormModal } from './modal.tsx';
import Link from 'next/link';

// Configuração das cores da Domus
const DOMUS_GOLD = '#ebd127';
const DOMUS_GOLD_HOVER = '#d4bd23';
const TEXT_ON_GOLD = '#1f2937'; 

interface ArtigoTableProps {
  artigos: Artigo[];
  totalCount: number;
  categorias: Categoria[];
  currentUserId: number;
}

const ITEMS_PER_PAGE = 20;

export function ArtigosTable({ artigos, totalCount, categorias, currentUserId }: ArtigoTableProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [artigoToDelete, setArtigoToDelete] = useState<Artigo | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingArtigo, setEditingArtigo] = useState<Artigo | null>(null);
  
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
    setEditingArtigo(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (artigo: Artigo) => {
    setEditingArtigo(artigo);
    setIsFormModalOpen(true);
  };
  
  const handleFormSuccess = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleOpenDeleteDialog = (artigo: Artigo) => {
    setArtigoToDelete(artigo);
    setDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDialogOpen(false);
    setArtigoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!artigoToDelete) return;

    const result = await deleteArtigo(artigoToDelete.id);
    
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
          Artigos
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por título..."
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
          <Table stickyHeader aria-label="Tabela de Artigos">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Data de Criação</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '120px' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artigos.map((artigo) => (
                <TableRow key={artigo.id}>
                  <TableCell>
                    {/* Link para o preview ou edição individual */}
                  
                      {artigo.titulo || '-'}
                 
                  </TableCell>
                  <TableCell>
                      {artigo.created_at ? new Date(artigo.created_at).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEditModal(artigo)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleOpenDeleteDialog(artigo)}><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {artigos.length === 0 && (
                <TableRow><TableCell colSpan={3} align="center">Nenhum artigo encontrado.</TableCell></TableRow>
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
            Tem certeza que deseja deletar permanentemente o artigo
            <strong>{` ${artigoToDelete?.titulo || ''}`}</strong>? Esta ação não pode ser desfeita.
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
        <ArtigoFormModal
          open={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSuccess={handleFormSuccess}
          editingArtigo={editingArtigo}
          categorias={categorias}
          currentUserId={currentUserId}
        />
      )}

    </Box>
  );
}