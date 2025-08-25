import Link from 'next/link';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao QR Pets</h1>
      <p className={styles.subtitle}>
        A maneira mais fácil e inteligente de manter as informações do seu pet sempre acessíveis.
        Crie um RG digital para seu melhor amigo!
      </p>
      <Link href="/pets" passHref>
        <button className={styles.ctaButton}>
          Ver Nossos Pets
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
