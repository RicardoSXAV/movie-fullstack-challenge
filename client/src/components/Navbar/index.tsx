import styles from "./Navbar.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

import Button from "../Button";
import popcorn from "../../assets/popcorn.png";
import { useApp } from "../../contexts/AppContext";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { currentUser, logoutUser, getCatalog, catalogMovies } = useApp();

  return (
    <div className={styles.container}>
      <Image src={popcorn} width={50} height={50} />
      <h1 className={styles.title}>Movies App</h1>

      {currentUser ? (
        <div className={styles.adminContainer}>
          <h1>{currentUser}</h1>
          <Button
            green
            onClick={() => {
              if (catalogMovies.length === 0) {
                getCatalog();
              }
              router.push("/catalog");
            }}
          >
            Catálogo
          </Button>
          <Button onClick={logoutUser}>Sair</Button>
        </div>
      ) : (
        <Button id={styles.loginButton} onClick={() => router.push("/login")}>
          Entrar
        </Button>
      )}
    </div>
  );
};

export default Navbar;
