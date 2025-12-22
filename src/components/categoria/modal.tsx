'use client';
import { useEffect } from 'react';
import { useActionState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
  CircularProgress
} from '@mui/material';
import { useFormStatus } from 'react-dom';
import { type Categoria } from '@/src/models.tsx'; // Ajustado para Categoria
import { type FormState, createCategoria, updateCategoria } from '@/actions/categoria.ts'; // Ajustado para actions de categoria

interface CategoriaFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  editingCategoria: Categoria | null; // Se for null, é modo de criação
}

// Configuração das cores da Domus
const DOMUS_GOLD = '#ebd127';
const DOMUS_GOLD_HOVER = '#d4bd23';
const TEXT_ON_GOLD = '#1f2937'; 

// Botão de submit que mostra o estado de loading
function SubmitButton({ isEditMode }: { isEditMode: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={pending}
      sx={{
        bgcolor: DOMUS_GOLD,
        color: TEXT_ON_GOLD,
        fontWeight: 'bold',
        '&:hover': {
          bgcolor: DOMUS_GOLD_HOVER,
        },
      }}
    >
      {pending ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Salvar Alterações' : 'Criar Categoria')}
    </Button>
  );
}

export function CategoriaFormModal({ open, onClose, onSuccess, editingCategoria }: CategoriaFormModalProps) {
  const isEditMode = Boolean(editingCategoria);
  const initialState: FormState = { message: '', success: false };

  // Escolhe a ação correta e anexa o ID se estiver no modo de edição
  const action = isEditMode ? updateCategoria : createCategoria;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess(state.message);
      onClose();
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', action: formAction }}>
      <DialogTitle>{isEditMode ? 'Editar Categoria' : 'Criar Nova Categoria'}</DialogTitle>
      <DialogContent>
        {/* Campo oculto para o ID no modo de edição */}
        {isEditMode && <input type="hidden" name="id" value={editingCategoria.id} />}
        
        <TextField
          autoFocus
          required
          margin="dense"
          name="nome"
          label="Nome da Categoria"
          type="text"
          fullWidth
          defaultValue={isEditMode ? editingCategoria.nome : ''}
          error={!!state.errors?.nome}
          helperText={state.errors?.nome?.[0]}
        />

        <TextField
          required
          margin="dense"
          name="descricao"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={3} // Campo maior para descrição
          defaultValue={isEditMode ? editingCategoria.descricao : ''}
          error={!!state.errors?.descricao}
          helperText={state.errors?.descricao?.[0]}
        />

      </DialogContent>
      <DialogActions>
        <Button sx={{ color: '#666' }} onClick={onClose}>Cancelar</Button>
        <SubmitButton isEditMode={isEditMode} />
      </DialogActions>
    </Dialog>
  );
}