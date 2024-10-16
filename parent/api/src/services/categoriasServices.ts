import Categoria from "../models/categoriasModels";

// Cria uma nova categoria
export const createCategoriaService = async (nome: string) => {
    try {
        const newCategoria = await Categoria.create({ nome });
        return newCategoria;
    } catch (error) {
        console.log("Erro ao criar categoria", error);
    }
};

// Lista todas as categorias
export const listarCategorias = async () => {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
    } catch (error) {
        console.log("Erro ao listar categorias", error);
    }
};

// Lista uma categoria por ID
export const listarUmaCategoria = async (id: number) => {
    try {
        const categoria = await Categoria.findByPk(id);
        return categoria;
    } catch (error) {
        console.log("Erro ao listar categoria", error);
    }
};

// Deleta uma categoria
export const deletarCategoria = async (id: number) => {
    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return { message: "Categoria não encontrada" };
        }

        await categoria.destroy();
        return { message: "Categoria deletada com sucesso" };
    } catch (error) {
        console.log("Erro ao deletar categoria", error);
    }
};

// Atualiza uma categoria
export const atualizarCategoria = async (id: number, nome?: string) => {
    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return { message: "Categoria não encontrada" };
        }

        if (nome) {
            categoria.nome = nome;
        }

        await categoria.save();
        return { message: "Categoria atualizada com sucesso" };
    } catch (error) {
        console.log("Erro ao atualizar categoria", error);
    }
};
