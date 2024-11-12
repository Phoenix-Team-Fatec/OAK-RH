import React, { useState } from 'react';
import './ModalConfirmDeleteUser.css';
import ErrorNotification from '../ModalErrorNotifcation/ErrorNotification';
import SuccessNotification from '../ModalSuccessNotification/SuccessNotification';
import axios from 'axios';

interface ModalConfirmDeleteUserProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedUserNames: string[];
    selectedIds: number[]; 
}

const ModalConfirmDeleteUser: React.FC<ModalConfirmDeleteUserProps> = ({
    open,
    onClose,
    onConfirm,
    selectedUserNames,
    selectedIds,
}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); 

    if (!open) return null;

    const message = selectedUserNames.length === 1
        ? `Tem certeza que deseja excluir o usuário ${selectedUserNames[0]}?`
        : `Tem certeza que deseja excluir esses ${selectedUserNames.length} usuários?`;

    const handleConfirm = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            await Promise.all(
                selectedIds.map(async (userId) => {
                    await axios.delete(`http://localhost:3000/users/${userId}`);
                })
            );
            setShowSuccess(true);
            onConfirm(); 
        } catch (error) {
            setErrorMessage('Erro ao excluir usuário(s), tente novamente.');
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModals = () => {
        onClose();
        setShowSuccess(false); 
    };

    return (
        <>
            <div className="modal-confirm-delete-user">
                <div className="modal-delete-user">
                    <h2 className="h2-modal-delete-user">Confirmação de Exclusão</h2>
                    <p>{message}</p>
                    <div className="modal-action-delete-user">
                        <button
                            onClick={handleConfirm}
                            className="confirm-button-delete-user"
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
                            className="cancel-button-delete-user"
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
                    message="Usuário(s) excluído(s) com sucesso!"
                    onClose={closeModals} 
                />
            )}
        </>
    );
};

export default ModalConfirmDeleteUser;
