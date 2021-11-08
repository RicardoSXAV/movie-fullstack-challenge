import styles from "./LoginForm.module.css";

import Button from "../Button";

const LoginForm: React.FC = () => {
  return (
    <div className={styles.box}>
      <h1 className={styles.title}>Entrar</h1>

      <input type="text" placeholder="Usuário" className={styles.input} />
      <input type="password" placeholder="Senha" className={styles.input} />

      <Button id={styles.button}>Entrar</Button>
    </div>
  );
};

export default LoginForm;
