'use client';
import { useEffect, useState, useRef } from 'react';
import { useActionState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,
  CircularProgress, Box, Chip, Autocomplete, Typography
} from '@mui/material';
import { useFormStatus } from 'react-dom';
import { type Artigo, type Categoria } from '@/src/models.tsx';
import { type FormState, createArtigo, updateArtigo } from '@/actions/artigo';

// Importa o CSS do Quill
import 'quill/dist/quill.snow.css'; 

interface ArtigoFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  editingArtigo: Artigo | null;
  categorias: Categoria[];
  currentUserId: number;
}

const DOMUS_GOLD = '#ebd127';
const DOMUS_GOLD_HOVER = '#d4bd23';
const TEXT_ON_GOLD = '#1f2937'; 

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
        '&:hover': { bgcolor: DOMUS_GOLD_HOVER },
        '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#a0a0a0' }
      }}
    >
      {pending ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Salvar Alterações' : 'Criar Artigo')}
    </Button>
  );
}

export function ArtigoFormModal({ open, onClose, onSuccess, editingArtigo, categorias, currentUserId }: ArtigoFormModalProps) {
  const isEditMode = Boolean(editingArtigo);
  const initialState: FormState = { message: '', success: false };
  const action = isEditMode ? updateArtigo : createArtigo;
  const [state, formAction] = useActionState(action, initialState);
  
  const [selectedCategorias, setSelectedCategorias] = useState<Categoria[]>(() => 
    isEditMode && editingArtigo?.categorias ? categorias.filter(c => editingArtigo.categorias.includes(c.id)) : []
  );

  // Refs para o Quill
  const editorRef = useRef<HTMLDivElement>(null); 
  const quillInstance = useRef<any>(null); 
  const [content, setContent] = useState<string>(''); 

  useEffect(() => {
    if (state.success) {
      onSuccess(state.message);
      onClose();
    }
  }, [state, onSuccess, onClose]);

  // Efeito para inicializar o Quill
  useEffect(() => {
    const initQuill = async () => {
      const { default: Quill } = await import('quill');

      if (editorRef.current && !quillInstance.current) {
        
        editorRef.current.innerHTML = '';

        const toolbarOptions = [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['clean']
        ];

        const quill = new Quill(editorRef.current, {
          theme: 'snow',
          modules: { toolbar: toolbarOptions },
          placeholder: 'Escreva o conteúdo do artigo aqui...'
        });

        quillInstance.current = quill;

        const initialValue = isEditMode && editingArtigo?.conteudo ? editingArtigo.conteudo : '';
        
        if (initialValue) {
            quill.root.innerHTML = initialValue;
        }
        setContent(initialValue);

        quill.on('text-change', () => {
          const html = quill.root.innerHTML;
          setContent(html === '<p><br></p>' ? '' : html);
        });
      }
    };

    if (open) {
      const timer = setTimeout(() => {
        initQuill();
      }, 100);
      
      return () => clearTimeout(timer);
    }

    return () => {
      quillInstance.current = null;
      setContent('');
    };
  }, [open, isEditMode, editingArtigo]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      PaperProps={{ component: 'form', action: formAction }} 
      maxWidth="lg" 
      fullWidth
    >
      <DialogTitle>{isEditMode ? 'Editar Artigo' : 'Criar Novo Artigo'}</DialogTitle>
      <DialogContent>
        {isEditMode && <input type="hidden" name="id" value={editingArtigo.id} />}
        <input type="hidden" name="created_by" value={currentUserId || ''} />
        
        <TextField
          autoFocus
          margin="dense"
          name="titulo"
          label="Título do Artigo"
          type="text"
          fullWidth
          defaultValue={isEditMode ? editingArtigo.titulo : ''}
          error={!!state.errors?.titulo}
          helperText={state.errors?.titulo?.[0]}
          sx={{ mb: 2 }}
        />

        {/* --- CAMPO SUBTÍTULO ADICIONADO --- */}
        <TextField
          margin="dense"
          name="subtitulo"
          label="Subtítulo (Opcional)"
          type="text"
          fullWidth
          defaultValue={isEditMode ? editingArtigo.subtitulo : ''}
          error={!!state.errors?.subtitulo}
          helperText={state.errors?.subtitulo?.[0]}
          sx={{ mb: 2 }}
        />

        <Autocomplete
          multiple
          options={categorias}
          getOptionLabel={(option) => option.nome}
          value={selectedCategorias}
          onChange={(event, newValue) => setSelectedCategorias(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Categorias"
              placeholder="Selecione categorias"
              error={!!state.errors?.categorias}
              helperText={state.errors?.categorias?.[0]}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...chipProps } = getTagProps({ index });
              return <Chip key={key} variant="outlined" label={option.nome} {...chipProps} />;
            })
          }
        />
        <input type="hidden" name="categorias" value={selectedCategorias.map(c => c.id).join(',')} />

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
            Conteúdo
        </Typography>
        
        <Box sx={{ 
            height: '400px', 
            mb: 4, 
            display: 'flex', 
            flexDirection: 'column',
            '& .ql-toolbar': { 
                borderTopLeftRadius: '4px', 
                borderTopRightRadius: '4px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                bgcolor: '#f5f5f5'
            },
            '& .ql-container': { 
                flexGrow: 1, 
                borderBottomLeftRadius: '4px', 
                borderBottomRightRadius: '4px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                fontSize: '1rem',
                fontFamily: 'inherit'
            },
            '& .ql-editor': {
                minHeight: '200px'
            }
        }}>
            <div ref={editorRef} style={{ height: '100%', backgroundColor: 'white' }} />
        </Box>

        <input type="hidden" name="conteudo" value={content} />

        {state.errors?.conteudo && (
            <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                {state.errors.conteudo[0]}
            </Typography>
        )}

        {!state.success && state.message && (
           <Typography color="error" variant="body2" sx={{ mt: 2 }}>
             {state.message}
           </Typography>
        )}

      </DialogContent>
      <DialogActions>
        <Button sx={{ color: '#666' }} onClick={onClose}>Cancelar</Button>
        <SubmitButton isEditMode={isEditMode} />
      </DialogActions>
    </Dialog>
  );
}