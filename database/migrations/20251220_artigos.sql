CREATE TABLE IF NOT  EXISTS artigos(
	  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  conteudo TEXT,
	  created_by BIGINT,
	  created_at TIMESTAMP,
	  updated_at TIMESTAMP,
	  FOREIGN KEY (created_by) REFERENCES usuarios(id) ON DELETE SET NULL
);