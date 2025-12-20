CREATE TABLE  IF NOT EXISTS artigo_categorias(
	  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     categoria_id BIGINT,
    artigo_id BIGINT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE,
    FOREIGN KEY (artigo_id) REFERENCES artigos(id) ON DELETE CASCADE
);