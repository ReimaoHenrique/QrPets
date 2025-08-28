// src/components/ContactIcons.tsx
import React from "react";

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
    <span className="contact-icons">
      {email && (
        <img
          src="/email.png"
          alt="Email"
          onClick={handleEmail}
          title="Enviar Email"
        />
      )}
      {instagram && (
        <img
          src="/instagram.png"
          alt="Instagram"
          onClick={handleInstagram}
          title="Abrir Instagram"
        />
      )}
      <img
        src="/whatsapp.png"
        alt="WhatsApp"
        onClick={handleWhatsApp}
        title="Abrir WhatsApp"
      />

      <style jsx>{`
        .contact-icons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1rem;
          padding: 2rem;
          border-radius: 20px;
          position: relative;
          z-index: 1;
          background: linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.7)
          );
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .contact-icons::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 85%;
          background-image: url(${backgroundImage || ""});
          background-size: cover;
          background-position: center bottom;
          opacity: 0.25;
          z-index: -1;
          border-radius: 20px;
        }

        img {
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        img:hover {
          transform: scale(1.2);
        }
      `}</style>
    </span>
  );
}
