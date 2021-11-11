import styles from "./Pagination.module.css";
import Button from "../Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  prevButton: Function;
  nextButton: Function;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  prevButton,
  nextButton,
}) => {
  return (
    <div className={styles.container}>
      {currentPage !== 1 && (
        <Button
          id={styles.button}
          onClick={() => prevButton(currentPage, totalPages)}
        >
          Página Anterior
        </Button>
      )}
      {currentPage < totalPages && (
        <Button
          id={styles.button}
          onClick={() => nextButton(currentPage, totalPages)}
        >
          Próxima Página
        </Button>
      )}
    </div>
  );
};

export default Pagination;
