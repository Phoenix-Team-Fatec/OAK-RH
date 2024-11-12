

interface RenderDraftFormProps {
    formId: number;
    questions: Question[];
    formName: string;
    formDescription: string;
    isLoading: boolean;
}


interface Question {
    categoria_id: number;
    descricao: string[];
    formulario_id: number;
    id: number;
    texto: string;
    tipo: string;
}


const RenderDraftForm = () => {





}