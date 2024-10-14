import React, { useState } from 'react';
import './selecaoFormularioMembro.css';

const SelecaoFormularioMembro: React.FC = () => {
    const [role, setRole] = useState('Liderado');
    const [activeButton, setActiveButton] = useState('Pendentes');

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    };

    const cards = [1, 2, 3, 4];

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
                {activeButton === 'Pendentes' &&
                    cards.map((card, index) => (
                        <div key={index} className="card">
                            <div className="card-header">Formulário {card}</div>
                            <div className="card-footer">Equipe {card}</div>
                        </div>
                    ))}

                {activeButton === 'Respondidos' && (
                    <div>Não há formulários respondidos ainda.</div>
                )}
            </div>
        </div>
    );
};

export default SelecaoFormularioMembro;
