import { useState } from "react";
import { useRouter } from "next/dist/client/router";

import styles from "./LoginForm.module.css";
import Button from "../Button";

import { useApp } from "../../contexts/AppContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const { loginUser, currentUser } = useApp();

  async function handleSubmit(event: any) {
    event.preventDefault();
    await loginUser({ username, password });

    if (!currentUser) {
      setLoginError(true);
    }
  }

  return (
    <form className={styles.box}>
      <h1 className={styles.title}>Entrar</h1>

      {loginError && <p>Usuário ou senha incorretos.</p>}

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
