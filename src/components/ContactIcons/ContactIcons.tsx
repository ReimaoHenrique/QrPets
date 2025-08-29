import React from "react";
import Image from "next/image";
import styles from "./ContactIcons.module.css";

interface ContactIconsProps {
  email?: string;
  instagram?: string;
  whatsapp?: string;
  backgroundImage?: string; // url da imagem do pet
}

export default function ContactIcons({
  email,
  instagram,
  whatsapp,
  backgroundImage,
}: ContactIconsProps) {
  const handleWhatsApp = () => {
    const waLink = whatsapp
      ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
      : `https://web.whatsapp.com/`;
    window.open(waLink, "_blank");
  };

  const handleEmail = () => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  const handleInstagram = () => {
    if (!instagram) return;
    window.open(
      instagram.startsWith("http")
        ? instagram
        : `https://instagram.com/${instagram}`,
      "_blank"
    );
  };

  return (
    <span
      className={styles["contact-icons"]}
      style={
        {
          "--bg-image": backgroundImage ? `url(${backgroundImage})` : "none",
        } as React.CSSProperties
      }
    >
      {email && (
        <Image
          width={50}
          height={50}
          src="/email.png"
          alt="Email"
          onClick={handleEmail}
          title="Enviar Email"
        />
      )}
      {instagram && (
        <Image
          width={50}
          height={50}
          src="/instagram.png"
          alt="Instagram"
          onClick={handleInstagram}
          title="Abrir Instagram"
        />
      )}
      {whatsapp && (
        <Image
          width={50}
          height={50}
          src="/whatsapp.png"
          alt="WhatsApp"
          onClick={handleWhatsApp}
          title="Abrir WhatsApp"
        />
      )}
    </span>
  );
}
