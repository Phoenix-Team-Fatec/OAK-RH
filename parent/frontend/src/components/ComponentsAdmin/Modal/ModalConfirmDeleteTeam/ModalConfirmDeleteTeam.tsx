import React, { useState } from 'react';
import './ModalConfirmDeleteTeam.css';
import axios from 'axios';
import SuccessNotification from '../ModalSuccessNotification/SuccessNotification';
import ErrorNotification from '../ModalErrorNotifcation/ErrorNotification';

interface ModalConfirmDeleteTeamProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedTeamNames: string[];
    selectedIds: number[]; 
}

const ModalConfirmDeleteTeam: React.FC<ModalConfirmDeleteTeamProps> = ({
    open,
    onClose,
    onConfirm,
    selectedTeamNames,
    selectedIds,
}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); 

    if (!open) return null;

    const message = selectedTeamNames.length === 1
        ? `Tem certeza que deseja excluir a equipe ${selectedTeamNames[0]}?`
        : `Tem certeza que deseja excluir essas ${selectedTeamNames.length} equipes?`;

    const handleConfirm = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            await Promise.all(
                selectedIds.map(async (teamId) => {
                    await axios.delete(`http://localhost:3000/equipe/${teamId}`);
                })
            );
            setShowSuccess(true);
            onConfirm(); // Chama a função para atualizar a lista de equipes
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao excluir equipe(s), tente novamente.';
            setErrorMessage(message);
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModals = () => {
        onClose();
        setShowSuccess(false); 
        setShowError(false); // Limpa também a mensagem de erro ao fechar
    };

    return (
        <>
            <div className="modal-confirm-delete-team">
                <div className="modal-delete-team">
                    <h2 className="h2-modal-delete-team">Confirmação de Exclusão</h2>
                    <p>{message}</p>
                    <div className="modal-action-delete-team">
                        <button
                            onClick={handleConfirm}
                            className="confirm-button-delete-team"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner"></span>
                            ) : (
                                'Confirmar'
                            )}
                        </button>
                        <button
                            onClick={closeModals}
                            className="cancel-button-delete-team"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            {showError && (
                <ErrorNotification
                    message={errorMessage}
                    onClose={() => setShowError(false)}
                />
            )}
            {showSuccess && ( 
                <SuccessNotification
                    message="Equipe(s) excluída(s) com sucesso!"
                    onClose={closeModals} 
                />
            )}
        </>
    );
};

export default ModalConfirmDeleteTeam;
