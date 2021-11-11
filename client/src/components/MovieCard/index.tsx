import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import styles from "./MovieCard.module.css";
import { useApp } from "../../contexts/AppContext";

type MovieCardProps = {
  title: string;
  imageUrl: string;
  duration: number;
  id: string;
  addOption?: boolean;
  getMovieInfo?: (id: string, title: string, imageUrl: string) => void;
  deletable?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  duration,
  id,
  addOption,
  getMovieInfo,
  deletable,
}) => {
  const { currentUser, addMovie, removeMovie } = useApp();

  return (
    <button
      className={styles.container}
      onClick={() => getMovieInfo(id, title, imageUrl)}
    >
      <img src={imageUrl} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tag}>{duration} min</div>
      {currentUser && addOption && (
        <button
          className={styles.addButton}
          onClick={(event) => {
            addMovie(id);
            event.stopPropagation();
          }}
        >
          <FaPlus />
        </button>
      )}
      {deletable && (
        <button
          className={styles.removeButton}
          onClick={(event) => {
            removeMovie(id);
            event.stopPropagation();
          }}
        >
          <IoClose />
        </button>
      )}
    </button>
  );
};

export default MovieCard;
