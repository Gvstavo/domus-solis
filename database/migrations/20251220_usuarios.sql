CREATE TABLE IF NOT EXISTS usuarios(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email TEXT UNIQUE,
    senha TEXT,
    nome TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);