import { useEffect, useState } from "react";
import axios from "axios";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import useLocalStorage from "../hooks/useLocalStorage";

import { apiUrl } from "../apiConfig";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import LoadingCard from "../components/LoadingCard";

const Home: NextPage = () => {
  const [movies, setMovies] = useLocalStorage([], "movies");

  useEffect(() => {
    if (movies.length === 0) {
      async function getData() {
        await axios.get(apiUrl + "/movie").then((response) => {
          setMovies(response.data.movies);
          console.log(response.data);
        });
      }
      getData();
    }

    console.log(movies);
  }, []);

  return (
    <>
      <Head>
        <title>Movies App</title>
      </Head>

      <Navbar />

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
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
