// src/components/ContactCheck.tsx
import { useState, useEffect } from "react";
import ContactIcons from "./ContactIcons";

interface ContactCheckProps {
  name: string;
  sex?: "male" | "female"; // male por padrão
  email?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function ContactCheck({
  name,
  sex,
  email,
  instagram,
  whatsapp,
}: ContactCheckProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [answeredYes, setAnsweredYes] = useState(false);

  const pronoun = sex === "female" ? "perdida" : "perdido";

  // Delay de quase 1 segundo pra aparecer a pergunta
  useEffect(() => {
    const timer = setTimeout(() => setShowQuestion(true), 75); // 75ms
    return () => clearTimeout(timer);
  }, []);

  if (!sex) return null; // se não tiver sexo, não pergunta nada

  return (
    <>
      {showQuestion && !answeredYes && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={() => setShowQuestion(false)}>
              ×
            </button>
            <p>
              Eu estou <span>{pronoun}</span>?
            </p>
            <div className="buttons">
              <button className="yes" onClick={() => setAnsweredYes(true)}>
                Sim
              </button>
              <button className="no" onClick={() => setShowQuestion(false)}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {answeredYes && (
        <div className="contact-modal">
          <ContactIcons
            email={email}
            instagram={instagram}
            whatsapp={whatsapp}
          />
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          position: relative;
          text-align: center;
          max-width: 400px;
          font-family: sans-serif;
        }

        .modal span {
          font-weight: bold;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .buttons button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .yes {
          background-color: #28a745;
          color: white;
        }

        .no {
          background-color: #dc3545;
          color: white;
        }

        .close {
          position: absolute;
          top: 8px;
          right: 12px;
          border: none;
          background: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .contact-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          z-index: 1000;
          text-align: center;
        }
      `}</style>
    </>
  );
}
