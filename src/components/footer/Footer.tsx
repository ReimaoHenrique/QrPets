import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>
          Desenvolvido por Datasynk. Direitos reservados © ARQPETS
        </p>
        <Image
          src="/datasynk.svg"
          alt="Datasynk Logo"
          width={120}
          height={28}
        />
      </div>
    </footer>
  );
}
