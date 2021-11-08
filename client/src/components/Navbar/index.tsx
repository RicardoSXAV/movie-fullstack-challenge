import styles from "./Navbar.module.css";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

import Button from "../Button";
import popcorn from "../../assets/popcorn.png";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src={popcorn} width={50} height={50} />
      <h1 className={styles.title}>Movies App</h1>

      <Button id={styles.loginButton} onClick={() => router.push("/login")}>
        Entrar
      </Button>
    </div>
  );
};

export default Navbar;
