import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { AiFillHome } from "react-icons/ai";

import styles from "../styles/Login.module.css";

import LoginForm from "../components/LoginForm";
import Button from "../components/Button";

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/")} id={styles.homeButton}>
        <AiFillHome />
      </Button>
      <LoginForm />
    </div>
  );
};

export default Login;
