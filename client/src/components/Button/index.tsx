import styles from "./Button.module.css";

const Button: React.FC<any> = (props) => {
  return (
    <button
      className={styles.buttonContainer}
      id={props.green && styles.buttonGreen}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
