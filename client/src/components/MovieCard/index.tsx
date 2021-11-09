import styles from "./MovieCard.module.css";

type MovieCardProps = {
  title: string;
  imageUrl: string;
  duration: number;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl, duration }) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} className={styles.image} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tag}>{duration} min</div>
    </div>
  );
};

export default MovieCard;
