import axios from "axios";
import { useEffect, useState } from "react";
import UserRenderForms from "./UserRenderForms";
import useUserData from "../../../hooks/useUserData";
import "./UserViewResponse.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Question {
  categoria_id: number;
  descricao: string[];
  formulario_id: number;
  id: number;
  texto: string;
  tipo: QuestionType;
}

interface Resposta {
  formulario_id: number;
  pergunta_id: number;
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

export default function UserFormsResponseView() {
  const [formulario_id] = useState(() => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("id");
    return id !== null ? id : 0;
  });
  const [formsData, setFormsData] = useState<Question[]>([]);
  const [formsName, setFormsName] = useState("");
  const [formsDescription, setFormsDescription] = useState("");
  const [answerData, setAnswerData] = useState<Resposta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [userArray, setUserArray] = useState<number[]>([]);
  const [userArrayIndex, setUserArrayIndex] = useState(0);

  const navigate = useNavigate();
  const { id } = useUserData();

  useEffect(() => {
    async function fetchData() {
      try {
        const questionsResponse = await axios.get(
          `http://localhost:3000/perguntas/listar/${formulario_id}`
        );
        setFormsData(questionsResponse.data);
        const formsId = questionsResponse.data[0]?.formulario_id || 0;

        const formsResponse = await axios.get(
          `http://localhost:3000/formulario/${formsId}`
        );
        setFormsName(formsResponse.data.nome);
        setFormsDescription(formsResponse.data.descricao);

        const usersArrayResponse = await axios.get(
          `http://localhost:3000/formulario_equipe/get/arrayUserAnswered/${formsId}/${id}`
        );
        setUserArray(usersArrayResponse.data);

        if (usersArrayResponse.data.length > 0) {
          const firstUserId = usersArrayResponse.data[0];
          const userDataResponse = await axios.get(
            `http://localhost:3000/user/getData/${firstUserId}`
          );
          setUser(userDataResponse.data.nome);

          const answersDataAPI = await axios.get(
            `http://localhost:3000/respostas/forms/user/${formulario_id}/${firstUserId}`
          );

          console.log(answersDataAPI);

          setAnswerData(answersDataAPI.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    }

    if (isLoading) fetchData();
  }, [isLoading, formulario_id, id]);

  function handleBackButton() {
    navigate("/forms-user");
  }

  async function nextUser() {
    if (userArrayIndex + 1 >= userArray.length) {
      alert("Fim da lista de usuários.");
      return;
    }

    const nextIndex = userArrayIndex + 1;
    const nextUserId = userArray[nextIndex];
    setUserArrayIndex(nextIndex);

    await axios
      .get(`http://localhost:3000/user/getData/${nextUserId}`)
      .then((userDataResponse) => {
        setUser(userDataResponse.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do próximo usuário:", error);
        setUser("");
      });

    const answersDataAPI = await axios.get(
      `http://localhost:3000/respostas/forms/user/${formulario_id}/${nextUserId}`
    );

    setAnswerData(answersDataAPI.data);
  }

  async function previousUser() {
    if (userArrayIndex - 1 < 0) {
      alert("Você está no primeiro usuário.");
      return;
    }

    const prevIndex = userArrayIndex - 1;
    const prevUserId = userArray[prevIndex];
    setUserArrayIndex(prevIndex);

    await axios
      .get(`http://localhost:3000/user/getData/${prevUserId}`)
      .then((userDataResponse) => {
        setUser(userDataResponse.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário anterior:", error);
        setUser("");
      });

    const answersDataAPI = await axios.get(
      `http://localhost:3000/respostas/forms/user/${formulario_id}/${prevUserId}`
    );

    setAnswerData(answersDataAPI.data);
  }

  function handleNavigation(direction: "next" | "previous") {
    if (direction === "next") {
      nextUser();
    } else {
      previousUser();
    }
  }

  useEffect(() => {
    console.log(formsData, answerData);
  }, [answerData]);

  return (
    <div>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className="container-forms-ver-respostas-user">
            <button
              className="button-back-forms-user-view"
              onClick={handleBackButton}
            >
              Voltar
            </button>
            <h2>Título do Formulário - {formsName}</h2>
            <span className="description-forms-user">
              Descrição do Formulário: {formsDescription}
            </span>
            <span className="description-forms-user">Usuário: {user}</span>
            {!formsData ||
            formsData.length === 0 ||
            !answerData ||
            answerData.length === 0 ? (
              <p>Carregando...</p>
            ) : (
              <UserRenderForms formsData={formsData} answerData={answerData} />
            )}

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
        </>
      )}
    </div>
  );
}
