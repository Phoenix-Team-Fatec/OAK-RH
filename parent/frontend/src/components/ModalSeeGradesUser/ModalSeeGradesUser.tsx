import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModalSeeGradesUser.css";
import useUserData from "../../hooks/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; 
import { jsPDF } from "jspdf"; 

interface ModalSeeGradesUserProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GradeAnswer {
  id: number;
  resposta: string;
  respondido_em: string;
}

const ModalSeeGradesUser: React.FC<ModalSeeGradesUserProps> = ({
  isOpen,
  onClose,
}) => {
  const { id: userId } = useUserData();
  const [gradeAnswers, setGradeAnswers] = useState<GradeAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchGradeAnswers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/respostas/user/${userId}`
          );
          console.log("Response Data:", response.data);

          const answers = Array.isArray(response.data) ? response.data : [];
          const filteredAnswers = answers.filter(
            (answer: any) => answer.tipo_resposta === "grade"
          );

          setGradeAnswers(
            filteredAnswers.map((answer: any) => ({
              id: answer.id,
              resposta: answer.resposta,
              respondido_em: answer.respondido_em,
            }))
          );
        } catch (err) {
          console.error("Error fetching grade answers:", err);
          setError("Erro ao buscar respostas de tipo grade.");
        }
      };

      fetchGradeAnswers();
    }
  }, [isOpen, userId]);

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

  // Download PDF function
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Autoavaliação Mensal", 10, 5);
  
    let yPosition = 45;
  
    gradeAnswers.forEach((answer, index) => {
      const barHeight = Number(answer.resposta) * 5;
      const barWidth = 10; 
      const xPosition = index * (barWidth + 10) + 30; 

      doc.setFillColor(23, 112, 53);
      doc.rect(xPosition, yPosition + 20 - barHeight, barWidth, barHeight, "F");
  
      doc.setFontSize(12);
      doc.text(answer.resposta, xPosition + barWidth / 2, yPosition + 20 - barHeight - 5, { align: "center" });

      doc.setFontSize(10);
      doc.text(getMonthName(answer.respondido_em), xPosition + barWidth / 2, yPosition + 20 + 10, { align: "center" });
  
      yPosition += 50; 
    });

    doc.save("autoavaliacao_mensal.pdf");
  };
  

  if (!isOpen) return null;

  return (
    <div className="self-assessment-modal-overlay">
      <div className="self-assessment-modal-container">
        <div className="self-assessment-modal-header">
          <h2>Autoavaliação Mensal</h2>
          <button className="download-pdf" onClick={downloadPDF}>
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: "8px" }} /> Baixar PDF
          </button>
          <button
            className="self-assessment-modal-close-button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="self-assessment-modal-content">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <p>Acompanhe sua evolução ao longo do tempo!</p>
              <div className="self-assessment-modal-chart">
                <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                  {gradeAnswers.map((answer, index) => {
                    const barHeight = Number(answer.resposta) * 10;
                    const xPosition = index * 60 + 30;

                    return (
                      <g key={answer.id}>
                        <rect
                          width="30"
                          height={barHeight}
                          x={xPosition}
                          y={150 - barHeight} 
                          fill="#177035"
                        />
                        <text
                          x={xPosition + 15}
                          y={145 - barHeight}
                          textAnchor="middle"
                          fontSize="16"
                          fill="#000"
                          className="answer-grade"
                        >
                          {answer.resposta}
                        </text>
                        <text
                          x={xPosition + 15}
                          y={160}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#333"
                          className="respondido_em-grade"
                        >
                          {getMonthName(answer.respondido_em)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalSeeGradesUser;
