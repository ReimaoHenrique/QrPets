import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          QR Pets
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
          Home
        </Link>
        <Link href="/pets" className={router.pathname.startsWith('/pets') ? styles.active : ''}>
          Pets
        </Link>
        <Link href="/about" className={router.pathname === '/about' ? styles.active : ''}>
          Sobre
        </Link>
        <Link href="/contact" className={router.pathname === '/contact' ? styles.active : ''}>
          Contato
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
