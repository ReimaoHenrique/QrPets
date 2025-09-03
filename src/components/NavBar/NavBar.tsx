import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src="/QrPetesLogo.svg"
            alt="QR Pets Logo"
            width={80}
            height={80}
            priority
          />
        </Link>
        <h1>Qr Petes</h1>
      </div>
      <div className={styles.links}>
        <Link href="/" className={router.pathname === "/" ? styles.active : ""}>
          Home
        </Link>
        <Link
          href="/shop"
          className={router.pathname.startsWith("/shop") ? styles.active : ""}
        >
          Shop
        </Link>
        <Link
          href="/about"
          className={router.pathname === "/about" ? styles.active : ""}
        >
          Sobre
        </Link>
        <Link
          href="/contact"
          className={router.pathname === "/contact" ? styles.active : ""}
        >
          Contato
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
