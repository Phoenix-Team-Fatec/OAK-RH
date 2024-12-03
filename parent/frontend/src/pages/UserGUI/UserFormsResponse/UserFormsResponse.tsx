import { useEffect, useState } from "react";
import axios from "axios";
import UserRenderForms from "./UserRenderForms";
import "./UserFormResponse.css";
import useUserData from "../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Question {
  categoria_id: number;
  descricao: string[];
  formulario_id: number;
  id: number;
  texto: string;
  tipo: string;
}

interface Resposta {
  pergunta_id: number;
  formulario_id: number;
  respondido_por: number;
  equipe_id: number;
  resposta: string | string[];
  tipo_resposta: QuestionType;
}

enum QuestionType {
  UniqueChoice = "uniqueChoice",
  MultipleChoice = "multipleChoice",
  LongQuestion = "longQuestion",
}

export default function UserFormsResponse() {
  const [formulario_id] = useState(() => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("id");
    return id !== null ? id : 0;
  });

  const [equipe_id] = useState(() => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("equipe_id");
    return id !== null ? id : 0;
  });

  const { id } = useUserData();

  const [data, setData] = useState<Question[]>([]);
  const [formsName, setFormsName] = useState("");
  const [formsDescription, setFormsDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [userArray, setUserArray] = useState<number[]>([]);
  const [userArrayIndex, setUserArrayIndex] = useState(0);
  const [userId, setUserId] = useState(0);

  const [userResponses, setUserResponses] = useState<{
    [key: number]: Resposta[];
  }>({});

  const [respostasAtuais, setRespostasAtuais] = useState<Resposta[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const questionsResponse = await axios.get(
          `http://localhost:3000/perguntas/listar/${formulario_id}`
        );
        setData(questionsResponse.data);
        const formsId = questionsResponse.data[0]?.formulario_id || 0;

        const formsResponse = await axios.get(
          `http://localhost:3000/formulario/${formsId}`
        );
        setFormsName(formsResponse.data.nome);
        setFormsDescription(formsResponse.data.descricao);

        const usersArrayResponse = await axios.get(
          `http://localhost:3000/formulario_equipe/get/arrayUserToAnswer/${formsId}/${id}`
        );
        setUserArray(usersArrayResponse.data);

        if (usersArrayResponse.data.length > 0) {
          const firstUserId = usersArrayResponse.data[0];
          const userDataResponse = await axios.get(
            `http://localhost:3000/user/getData/${firstUserId}`
          );
          setUser(userDataResponse.data.nome);
          setUserId(firstUserId);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    }

    if (isLoading) fetchData();
  }, [isLoading, formulario_id, id]);

  function nextUser() {
    if (userArrayIndex + 1 >= userArray.length) {
      alert("Fim da lista de usuários.");
      return;
    }

    setUserResponses((prev) => ({
      ...prev,
      [userId]: respostasAtuais,
    }));

    const nextIndex = userArrayIndex + 1;
    const nextUserId = userArray[nextIndex];
    setUserArrayIndex(nextIndex);
    setUserId(nextUserId);

    axios
      .get(`http://localhost:3000/user/getData/${nextUserId}`)
      .then((userDataResponse) => {
        setUser(userDataResponse.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do próximo usuário:", error);
        setUser("");
      });

    if (userResponses[nextUserId]) {
      setRespostasAtuais(userResponses[nextUserId]);
    } else {
      setRespostasAtuais([]);
    }
  }

  function previousUser() {
    if (userArrayIndex - 1 < 0) {
      alert("Você está no primeiro usuário.");
      return;
    }

    setUserResponses((prev) => ({
      ...prev,
      [userId]: respostasAtuais,
    }));

    const prevIndex = userArrayIndex - 1;
    const prevUserId = userArray[prevIndex];
    setUserArrayIndex(prevIndex);
    setUserId(prevUserId);

    axios
      .get(`http://localhost:3000/user/getData/${prevUserId}`)
      .then((userDataResponse) => {
        setUser(userDataResponse.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário anterior:", error);
        setUser("");
      });

    // Carregar respostas existentes do usuário anterior do estado
    if (userResponses[prevUserId]) {
      setRespostasAtuais(userResponses[prevUserId]);
    } else {
      setRespostasAtuais([]);
    }
  }

  async function handleSubmit(answers: Resposta[]) {
    try {
      await axios.post(`http://localhost:3000/respostas/${userId}`, answers);
      alert("Resposta enviada com sucesso");

      setUserResponses((prev) => ({
        ...prev,
        [userId]: answers,
      }));

      setRespostasAtuais(answers);

      if (userArrayIndex + 1 < userArray.length) {
        nextUser();
        setUserArray((prevArray) => {
          const updatedArray = prevArray.filter(
            (_, index) => index !== userArrayIndex
          );
          return updatedArray;
        });
      } else {
        alert("Todas as respostas foram enviadas!");
        navigate("/forms-user");
      }
    } catch (error) {
      alert("Erro ao enviar resposta");
      console.error(error);
    }
  }

  function handleNavigation(direction: "next" | "previous") {
    if (direction === "next") {
      nextUser();
    } else {
      previousUser();
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="container-forms-responder-user">
          <h2>Título do Formulário - {formsName}</h2>
          <span className="description-forms-user">
            Descrição do Formulário: {formsDescription}
          </span>
          <span className="description-forms-user">Usuário: {user}</span>
          <UserRenderForms
            data={data}
            equipe_id={Number(equipe_id)}
            onSubmit={handleSubmit}
            formsId={Number(formulario_id)}
            userId={userId}
            existingResponses={respostasAtuais}
            setRespostasAtuais={setRespostasAtuais}
          />
          <div className="button-next-previous">
          <button
            onClick={() => handleNavigation("previous")}
            className="button-anterior-forms"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="button-proximo-forms"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
