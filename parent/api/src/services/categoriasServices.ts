import Categoria from "../models/categoriasModels";

// Cria uma nova categoria
export const createCategoriaService = async (nome: string, id_admin: number) => {
    try {
        const newCategoria = await Categoria.create({ nome, id_admin });
        return newCategoria;
    } catch (error) {
        console.log("Erro ao criar categoria", error);
        throw error;
    }
};

// Lista todas as categorias
export const listarCategorias = async (id_admin: number) => {
    try {
        const categorias = await Categoria.findAll({ where: { id_admin } });
        return categorias;
    } catch (error) {
        console.log("Erro ao listar categorias", error);
        throw error;
    }
};

// Lista uma categoria por ID
export const listarUmaCategoria = async (id: number, id_admin: number) => {
    try {
        const categoria = await Categoria.findOne({ where: { id, id_admin } });

        if (!categoria) {
            return { message: "Categoria não encontrada ou não pertence a este admin" };
        }

        return categoria;
    } catch (error) {
        console.log("Erro ao listar categoria", error);
        throw error;
    }
};

// Deleta uma categoria
export const deletarCategoria = async (id: number, id_admin: number) => {
    try {
        const categoria = await Categoria.findOne({ where: { id, id_admin } });

        if (!categoria) {
            return { message: "Categoria não encontrada ou não pertence a este admin" };
        }

        await categoria.destroy();
        return { message: "Categoria deletada com sucesso" };
    } catch (error) {
        console.log("Erro ao deletar categoria", error);
        throw error;
    }
};

// Atualiza uma categoria
export const atualizarCategoria = async (id: number, id_admin: number, nome?: string) => {
    try {
        const categoria = await Categoria.findOne({ where: { id, id_admin } });

        if (!categoria) {
            return { message: "Categoria não encontrada ou não pertence a este admin" };
        }

        if (nome) {
            categoria.nome = nome;
        }

        await categoria.save();
        return { message: "Categoria atualizada com sucesso" };
    } catch (error) {
        console.log("Erro ao atualizar categoria", error);
        throw error;
    }
};
