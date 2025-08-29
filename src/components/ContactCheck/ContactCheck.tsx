// src/components/ContactCheck.tsx
import { useState, useEffect } from "react";
import ContactIcons from "../ContactIcons/ContactIcons";
import styles from "./ContactCheck.module.css";

interface ContactCheckProps {
  name: string;
  sex?: "male" | "female";
  email?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function ContactCheck({
  sex,
  email,
  instagram,
  whatsapp,
}: ContactCheckProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [answeredYes, setAnsweredYes] = useState(false);

  const pronoun = sex === "female" ? "perdida" : "perdido";

  useEffect(() => {
    const timer = setTimeout(() => setShowQuestion(true), 75);
    return () => clearTimeout(timer);
  }, []);

  if (!sex) return null;

  return (
    <>
      {showQuestion && !answeredYes && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.close}
              onClick={() => setShowQuestion(false)}
            >
              ×
            </button>
            <p>
              Eu estou <span className={styles.pronoun}>{pronoun}</span>?
            </p>
            <div className={styles.buttons}>
              <button
                className={styles.yes}
                onClick={() => setAnsweredYes(true)}
              >
                Sim
              </button>
              <button
                className={styles.no}
                onClick={() => setShowQuestion(false)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {answeredYes && (
        <div className={styles.contactModal}>
          <button
            className={styles.close}
            onClick={() => setAnsweredYes(false)}
          >
            ×
          </button>
          <ContactIcons
            email={email}
            instagram={instagram}
            whatsapp={whatsapp}
          />
        </div>
      )}
    </>
  );
}
