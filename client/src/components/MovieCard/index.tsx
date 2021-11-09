import { FaPlus } from "react-icons/fa";

import styles from "./MovieCard.module.css";
import { useApp } from "../../contexts/AppContext";

type MovieCardProps = {
  title: string;
  imageUrl: string;
  duration: number;
  id: string;
  addOption?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  duration,
  id,
  addOption,
}) => {
  const { currentUser, addMovie } = useApp();

  return (
    <button className={styles.container}>
      <img src={imageUrl} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tag}>{duration} min</div>
      {currentUser && addOption && (
        <button className={styles.addButton} onClick={() => addMovie(id)}>
          <FaPlus />
        </button>
      )}
    </button>
  );
};

export default MovieCard;
