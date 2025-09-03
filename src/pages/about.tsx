import Head from "next/head";
import styles from "../styles/About.module.css";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Sobre - QR Pets</title>
        <meta
          name="description"
          content="Saiba mais sobre a QR Pets, nossos produtos e missão."
        />
        <meta property="og:title" content="Sobre - QR Pets" />
        <meta
          property="og:description"
          content="Saiba mais sobre a QR Pets, nossos produtos e missão."
        />
        <meta
          property="og:image"
          content="https://qrpets.info/QrPetesLogo.svg"
        />
        <meta property="og:url" content="https://qrpets.info/about" />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Sobre o QR Pets</h1>

        <section>
          <h2 className={styles.sectionTitle}>Nossa Missão</h2>
          <p className={styles.text}>
            Nossa missão é garantir a segurança e o bem-estar dos pets,
            oferecendo uma solução digital, rápida e eficiente para que
            informações vitais estejam sempre acessíveis. Acreditamos que a
            tecnologia pode ser uma grande aliada na proteção dos nossos
            melhores amigos.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nossa Visão</h2>
          <p className={styles.text}>
            Queremos criar um mundo onde nenhum pet se perca ou fique sem
            cuidados por falta de informação. Nossa visão é ser a plataforma
            líder em identificação digital de animais de estimação, conectando
            donos, veterinários e quem mais puder ajudar, de forma simples e
            instantânea.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
