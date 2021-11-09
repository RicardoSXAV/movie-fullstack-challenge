import type { NextPage } from "next";

import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";

const Catalog: NextPage = () => {
  const { catalogMovies } = useApp();

  return (
    <div>
      <h1>Catálogo</h1>

      {catalogMovies.map((movie) => (
        <MovieCard
          id={movie.id}
          title={movie.title}
          imageUrl={movie.image.url}
          duration={movie.runningTimeInMinutes}
        />
      ))}
    </div>
  );
};

export default Catalog;
