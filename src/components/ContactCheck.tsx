// src/components/ContactCheck.tsx
import { useState, useEffect } from "react";

interface ContactCheckProps {
  name: string;
  sex?: "male" | "female"; // male por padrão
  email?: string;
  phone?: string;
  address?: string;
}

export default function ContactCheck({
  name,
  sex = "male",
  email,
  phone,
  address,
}: ContactCheckProps) {
  const [answeredYes, setAnsweredYes] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  // Delay de 75ms para aparecer
  useEffect(() => {
    const timeout = setTimeout(() => setShowQuestion(true), 75);
    return () => clearTimeout(timeout);
  }, []);

  const pronoun =
    sex === "female" ? "perdida" : sex === "male" ? "perdido" : null;

  if (!showQuestion && !answeredYes) return null;

  return (
    <div className="overlay">
      <div className="contact-check-container">
        {/* X de fechar */}
        <button className="close-btn" onClick={() => setShowQuestion(false)}>
          ×
        </button>

        {!answeredYes && pronoun ? (
          <div className="question-box">
            <p>
              Eu estou
              <span>
                {pronoun}
                <img className="animal-gif" src="/animal.gif" alt="animal" />
              </span>
              ?
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
        ) : answeredYes ? (
          <div className="contact-box">
            <h3>Contato do dono de {name}:</h3>
            <p>
              <strong>Email:</strong> {email || "-"}
            </p>
            <p>
              <strong>Telefone:</strong> {phone || "-"}
            </p>
            <p>
              <strong>Endereço:</strong> {address || "-"}
            </p>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 9999;
        }

        .contact-check-container {
          position: relative;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 2rem;
          max-width: 400px;
          text-align: center;
          font-family: sans-serif;
          background-color: #fafafa;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          animation: popIn 0.2s ease forwards;
        }

        .close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
        }

        @keyframes popIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        span {
          position: relative;
          font-weight: bold;
          color: #ff6f00;
        }

        .animal-gif {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 85%;
          z-index: -1; /* atrás do span */
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        button.yes {
          background-color: #28a745;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        button.no {
          background-color: #dc3545;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        .contact-box h3 {
          margin-bottom: 1rem;
        }

        .contact-box p {
          margin: 0.3rem 0;
        }
      `}</style>
    </div>
  );
}
