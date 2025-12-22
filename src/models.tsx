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
