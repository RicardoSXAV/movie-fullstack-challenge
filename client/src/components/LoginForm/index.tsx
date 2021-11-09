import { useState } from "react";
import { useRouter } from "next/dist/client/router";

import styles from "./LoginForm.module.css";
import Button from "../Button";

import { useApp } from "../../contexts/AppContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useApp();
  const router = useRouter();

  function handleSubmit() {
    loginUser({ username, password });
    router.push("/");
  }

  return (
    <form className={styles.box}>
      <h1 className={styles.title}>Entrar</h1>

      <input
        type="text"
        placeholder="Usuário"
        className={styles.input}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className={styles.input}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button type="submit" id={styles.button} onClick={handleSubmit}>
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;
