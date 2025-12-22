export interface Usuario{
	id: int;
	email: string;
	senha: string;
	nome: string;
	created_at: Date;
}
export interface Categoria {
    id: int;
    nome: string;
    descricao: string;
    slug?: string | null;
}

export interface Artigo{
	id: int;
	conteudo: string;
	created_by: int;
	created_at: Date;
	updated_at: Date;
	titulo: string;
	slug: string;
}