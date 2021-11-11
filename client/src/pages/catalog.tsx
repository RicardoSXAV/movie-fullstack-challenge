import type { NextPage } from "next";

import styles from "../styles/Catalog.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { apiUrl } from "../apiConfig";
import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const Catalog: NextPage = () => {
  const [showInformation, setShowInformation] = useState({});

  const { catalogMovies, verifyAuth } = useApp();

  verifyAuth();

  async function getMovieInfo(id: string, title: string, imageUrl: string) {
    const editedId = id.replace("/title/", "").replace("/", "");

    await axios.get(apiUrl + "/movie/" + editedId).then((response) =>
      setShowInformation({
        title,
        description: response.data.text,
        imageUrl,
      })
    );
  }

  function clearInfo() {
    setShowInformation({});
  }

  return (
    <>
      <Navbar home />
      <h1 className={styles.title}>Catálogo</h1>

      {JSON.stringify(showInformation) !== "{}" && (
        <Modal movieInfo={showInformation} clearInfo={clearInfo} />
      )}

      <div className={styles.container}>
        {catalogMovies?.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            imageUrl={movie.image.url}
            duration={movie.runningTimeInMinutes}
            getMovieInfo={getMovieInfo}
            deletable
          />
        ))}
      </div>
    </>
  );
};

export default Catalog;
