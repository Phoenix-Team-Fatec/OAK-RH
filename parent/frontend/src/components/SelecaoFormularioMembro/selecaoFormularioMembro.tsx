import React, { useEffect, useState } from 'react';
import './selecaoFormularioMembro.css';

interface Formulario {
  id: number;
  nome: string;
  equipe: string;
}

const SelecaoFormularioMembro: React.FC = () => {
  const [role, setRole] = useState('Liderado');
  const [activeButton, setActiveButton] = useState('Pendentes');
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Substitua pelo ID do administrador desejado
  const adminId = localStorage.getItem('adminId'); 

  useEffect(() => {
    const fetchFormularios = async () => {
      setLoading(true);
      setError(null); // Limpa o erro anterior, se houver

      try {
        const response = await fetch(
          `http://localhost:3000/formulario/listar/${adminId}`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar os formulários.');
        }

        const data: Formulario[] = await response.json();
        setFormularios(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormularios();
  }, [activeButton]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className="main-container">
      <div className="header">
        <button
          className={activeButton === 'Pendentes' ? 'active' : ''}
          onClick={() => handleButtonClick('Pendentes')}
        >
          Pendentes
        </button>
        <button
          className={activeButton === 'Respondidos' ? 'active' : ''}
          onClick={() => handleButtonClick('Respondidos')}
        >
          Respondidos
        </button>
        <select value={role} onChange={handleRoleChange}>
          <option value="Lider">Líder</option>
          <option value="Liderado">Liderado</option>
        </select>
      </div>

      <div className="container">
        {loading ? (
          <p>Carregando formulários...</p>
        ) : error ? (
          <p className="error">Erro: {error}</p>
        ) : activeButton === 'Pendentes' ? (
          formularios.length > 0 ? (
            formularios.map((formulario) => (
              <div key={formulario.id} className="card">
                <div className="card-header">{formulario.nome}</div>
              </div>
            ))
          ) : (
            <p>Nenhum formulário pendente encontrado.</p>
          )
        ) : (
          <div>Não há formulários respondidos ainda.</div>
        )}
      </div>
    </div>
  );
};

export default SelecaoFormularioMembro;
