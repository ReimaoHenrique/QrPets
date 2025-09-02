import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import styles from "./ContactIcons.module.css";

interface ContactIconsProps {
  email?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function ContactIcons({
  email,
  instagram,
  whatsapp,
}: ContactIconsProps) {
  const handleWhatsApp = () => {
    if (!whatsapp) return;
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, "")}`, "_blank");
  };

  const handleEmail = () => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  const handleInstagram = () => {
    if (!instagram) return;
    const igLink = instagram.startsWith("http")
      ? instagram
      : `https://instagram.com/${instagram}`;
    window.open(igLink, "_blank");
  };

  return (
    <div className={styles.container}>
      {email && (
        <button
          className={`${styles.contactButton} ${styles.emailButton}`}
          onClick={handleEmail}
        >
          <FaEnvelope size={20} /> {email}
        </button>
      )}
      {whatsapp && (
        <button
          className={`${styles.contactButton} ${styles.whatsappButton}`}
          onClick={handleWhatsApp}
        >
          <FaWhatsapp size={20} /> {whatsapp}
        </button>
      )}
      {instagram && (
        <button
          className={`${styles.contactButton} ${styles.instagramButton}`}
          onClick={handleInstagram}
        >
          <FaInstagram size={20} /> {instagram}
        </button>
      )}
    </div>
  );
}
