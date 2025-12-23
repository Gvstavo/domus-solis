'use client';

import React from 'react';
import { Paper } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';

// Importa o CSS do Quill para que as classes (ql-align, ql-size, etc) funcionem
import 'quill/dist/quill.snow.css'; 

interface ArtigoViewerProps {
  content: string;
}

export function ArtigoViewer({ content }: ArtigoViewerProps) {
  // Limpa scripts maliciosos caso existam
  const cleanContent = DOMPurify.sanitize(content);

  return (
    <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
      {/* 'ql-container' e 'ql-snow' ativam o CSS base do Quill.
         Customizamos via style para remover bordas e aumentar a fonte para leitura.
      */}
      <div className="ql-container ql-snow" style={{ border: 'none', fontFamily: 'inherit' }}>
        <div 
          className="ql-editor"
          style={{ padding: 0, fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}
          dangerouslySetInnerHTML={{ __html: cleanContent }} 
        />
      </div>
    </Paper>
  );
}