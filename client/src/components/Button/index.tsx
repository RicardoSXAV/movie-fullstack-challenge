import styles from "./Button.module.css";

const Button: React.FC<any> = (props) => {
  return (
    <button className={styles.buttonContainer} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
