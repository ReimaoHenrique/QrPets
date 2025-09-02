// src/components/ContactCheck.tsx
import { useState } from "react";
import Image from "next/image";
import ContactIcons from "../ContactIcons/ContactIcons"; // seu componente com react-icons
import styles from "./ContactCheck.module.css";

interface ContactCheckProps {
  name: string;
  sex?: "male" | "female";
  email?: string;
  instagram?: string;
  whatsapp?: string;
  photoUrl?: string;
  ownerName?: string;
}

export default function ContactCheck({
  name,
  sex,
  email,
  instagram,
  whatsapp,
  photoUrl,
  ownerName,
}: ContactCheckProps) {
  const [show, setShow] = useState(true);
  const pronoun = sex === "female" ? "perdida" : "perdido";

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={() => setShow(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.avatar}>
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={name}
              width={100}
              height={100}
              className={styles.rounded}
            />
          ) : (
            "🐾"
          )}
        </div>

        <div className={styles.info}>
          <strong>Eu sou {name}</strong>
          <p>Estou {pronoun}?</p>
          <p>Aqui estão os dados do meu dono:</p>

          {/* Contatos com ícones */}
          <ContactIcons
            email={email}
            instagram={instagram}
            whatsapp={whatsapp}
          />

          {ownerName && <p>Nome do dono: {ownerName}</p>}

          <small>(Clique fora ou aqui para fechar)</small>
        </div>
      </div>
    </div>
  );
}
