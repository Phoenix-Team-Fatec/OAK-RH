import React, { useState } from 'react';
import './ModalConfirmDeleteForms.css';
import ErrorNotification from '../ModalErrorNotifcation/ErrorNotification';
import SuccessNotification from '../ModalSuccessNotification/SuccessNotification';
import axios from 'axios';

interface ModalConfirmDeleteFormsProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedFormNames: string[];
    selectedIds: number[];
}

const ModalConfirmDeleteForms: React.FC<ModalConfirmDeleteFormsProps> = ({
    open,
    onClose,
    onConfirm,
    selectedFormNames,
    selectedIds,
}) => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!open) return null;

    const message = selectedFormNames.length === 1
        ? `Tem certeza que deseja excluir o formulário ${selectedFormNames[0]}?`
        : `Tem certeza que deseja excluir esses ${selectedFormNames.length} formulários?`;

    const handleConfirm = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            await Promise.all(
                selectedIds.map(async (formId) => {
                    await axios.delete(`http://localhost:3000/forms/${formId}`);
                })
            );
            setShowSuccess(true);
            onConfirm();
        } catch (error) {
            setErrorMessage('Erro ao excluir formulário(s), tente novamente.');
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
            <div className="modal-confirm-delete-forms">
                <div className="modal-delete-forms">
                    <h2 className="h2-modal-delete-forms">Confirmação de Exclusão</h2>
                    <p>{message}</p>
                    <div className="modal-action-delete-forms">
                        <button
                            onClick={handleConfirm}
                            className="confirm-button-delete-forms"
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
                            className="cancel-button-delete-forms"
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
                    message="Formulário(s) excluído(s) com sucesso!"
                    onClose={closeModals}
                />
            )}
        </>
    );
};

export default ModalConfirmDeleteForms;
