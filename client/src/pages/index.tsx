import { useEffect, useState } from "react";
import axios from "axios";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

import styles from "../styles/Home.module.css";
import useLocalStorage from "../hooks/useLocalStorage";
import { useApp } from "../contexts/AppContext";

import { apiUrl } from "../apiConfig";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import LoadingCard from "../components/LoadingCard";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

const Home: NextPage = () => {
  const [showInformation, setShowInformation] = useState({});

  const { movies, getMovies, moviesPagination, setMovies } = useApp();

  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
  }, []);

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

  function prevButton(currentPage: number, totalPages: number) {
    if (currentPage !== 1) {
      const page = currentPage - 1;
      setMovies([]);
      getMovies(page);
    }
  }

  function nextButton(currentPage: number, totalPages: number) {
    if (currentPage < totalPages) {
      const page = currentPage + 1;
      setMovies([]);
      getMovies(page);
    }
  }

  return (
    <>
      <Head>
        <title>Movies App</title>
      </Head>

      <Navbar />

      {JSON.stringify(showInformation) !== "{}" && (
        <Modal movieInfo={showInformation} clearInfo={clearInfo} />
      )}

      <div className={styles.cardContainer}>
        {movies?.length === 0 ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          movies?.map((movie: any) => (
            <MovieCard
              title={movie.title}
              imageUrl={movie.image.url}
              duration={movie.runningTimeInMinutes}
              id={movie.id}
              getMovieInfo={getMovieInfo}
              addOption
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={moviesPagination?.currentPage}
        totalPages={moviesPagination?.totalPages}
        prevButton={prevButton}
        nextButton={nextButton}
      />
    </>
  );
};

export default Home;
