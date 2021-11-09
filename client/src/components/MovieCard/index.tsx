import { FaPlus } from "react-icons/fa";

import styles from "./MovieCard.module.css";
import { useApp } from "../../contexts/AppContext";

type MovieCardProps = {
  title: string;
  imageUrl: string;
  duration: number;
  id: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  duration,
  id,
}) => {
  const { currentUser, addMovie } = useApp();

  return (
    <div className={styles.container}>
      <img src={imageUrl} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tag}>{duration} min</div>
      {currentUser && (
        <button className={styles.addButton} onClick={() => addMovie(id)}>
          <FaPlus />
        </button>
      )}
    </div>
  );
};

export default MovieCard;
