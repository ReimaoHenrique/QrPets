import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>QR Pets - Home</title>
        <meta
          name="description"
          content="Bem-vindo ao QR Pets: Gadgets e acessórios inteligentes para pets."
        />
        <meta property="og:title" content="QR Pets - Home" />
        <meta
          property="og:description"
          content="Bem-vindo ao QR Pets: Gadgets e acessórios inteligentes para pets."
        />
        <meta
          property="og:image"
          content="https://qrpets.info/images/produtos/logo.png"
        />
        <meta property="og:url" content="https://qrpets.info/" />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles.container}>
        <div className={styles.hero}>
          <Image
            src="/images/produtos/logo.png"
            alt="QR Pets Logo"
            width={150}
            height={150}
            priority
          />
          <h1 className={styles.title}>Bem-vindo ao QR Pets</h1>
          <p className={styles.subtitle}>
            A maneira mais fácil e inteligente de manter as informações do seu
            pet sempre acessíveis. Crie um RG digital para seu melhor amigo!
          </p>
          <Link href="/shop" passHref>
            <button className={styles.ctaButton}>Ver Nossos Produtos</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
