import React, { useState } from "react";
import "./ModalCreateCategory.css";
import {
  createCategory,
  fetchCategories,
  deleteCategorie,
  editCategorie,
} from "./categoria";
import useUserData from "../../hooks/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

interface ModalCreateCategoryProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
  open,
  onClose,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [currentView, setCurrentView] = useState<"create" | "list">("create");
  const [categories, setCategories] = useState<{ id: string; nome: string }[]>(
    []
  );
  const { id } = useUserData();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert("Por favor, insira o nome da categoria.");
      return;
    }

    try {
      if (id) {
        await createCategory(categoryName, id);
        alert("Categoria cadastrada com sucesso!");
        setCategoryName("");
        fetchAllCategories();
      }
    } catch (error) {
      console.error("Erro ao cadastrar categoria", error);
      alert("Erro ao cadastrar a categoria. Tente novamente.");
    }
  };

  // Função para buscar categorias
  const fetchAllCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories(id);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  // Função para excluir categoria
  const handleDelete = async (categoryToDelete: string) => {
    try {
      await deleteCategorie(categoryToDelete);
      alert("Categoria excluída com sucesso!");
      fetchAllCategories();
    } catch (error) {
      console.error("Erro ao excluir categoria", error);
      alert("Erro ao excluir a categoria. Tente novamente.");
    }
  };

  // Função para editar categoria
  const handleEdit = async () => {
    if (!editingCategory || !categoryName.trim()) {
      alert("Por favor, insira um nome válido para a categoria.");
      return;
    }

    try {
      if (id) {
        await editCategorie(editingCategory, categoryName, id);
        alert("Categoria editada com sucesso!");
        setCategoryName("");
        setEditingCategory(null);
        fetchAllCategories();
      }
    } catch (error) {
      console.error("Erro ao editar categoria", error);
      alert("Erro ao editar a categoria. Tente novamente.");
    }
  };

  // Função para alternar entre as visualizações
  const toggleView = () => {
    if (currentView === "create") {
      fetchAllCategories();
    }
    setCurrentView(currentView === "create" ? "list" : "create");
  };

  return (
    <>
      {open && (
        <div className="modal-categories-overlay">
          <div className="modal-categories-content-container">
            <span className="modal-categories-close-button" onClick={onClose}>
              &times;
            </span>
            <h2 className="modal-categories-title">
              {currentView === "create"
                ? "Cadastrar Nova Categoria"
                : "Ver Categorias"}
            </h2>

            <div className="modal-categories-view-toggle">
              <button
                onClick={toggleView}
                className={`modal-categories-view-button ${
                  currentView === "create" ? "active" : ""
                }`}
              >
                Cadastrar
              </button>
              <button
                onClick={toggleView}
                className={`modal-categories-view-button ${
                  currentView === "list" ? "active" : ""
                }`}
              >
                Ver Categorias
              </button>
            </div>

            {currentView === "create" ? (
              <>
                <input
                  type="text"
                  placeholder="Nome da Categoria"
                  className="modal-categories-input"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <div className="modal-categories-action-buttons">
                  <button
                    onClick={onClose}
                    className="modal-categories-button-secondary"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={editingCategory ? handleEdit : handleSubmit}
                    className="modal-categories-button-primary"
                  >
                    {editingCategory ? "Salvar Alterações" : "Cadastrar"}
                  </button>
                </div>
              </>
            ) : (
              <div className="modal-categories-list">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id} className="modal-categories-item">
                      <span>{category.nome}</span>
                      <div className="modal-categories-edit-delete-container">
                        <button
                          onClick={() => {
                            setCategoryName(category.nome);
                            setEditingCategory(category.id);
                          }}
                          className="modal-categories-edit-button"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="modal-categories-delete-button"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhuma categoria cadastrada.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreateCategory;
