import { IoClose } from "react-icons/io5";

import styles from "./Modal.module.css";
import Button from "../Button";

type ModalProps = {
  movieInfo: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  clearInfo: Function;
};

const Modal: React.FC<ModalProps> = ({ movieInfo, clearInfo }) => {
  const { title, imageUrl, description } = movieInfo;

  return (
    <>
      <div className={styles.box}>
        <Button id={styles.closeButton} onClick={() => clearInfo()}>
          <IoClose />
        </Button>
        <div className={styles.overflow}>
          <img src={imageUrl} alt={title} className={styles.image} />
          <h1>{title}</h1>

          <p>{description}</p>
        </div>
      </div>

      <div className={styles.blackground} />
    </>
  );
};

export default Modal;
