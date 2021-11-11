import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { createContext, useState, useContext, ReactNode } from "react";

import { apiUrl } from "../apiConfig";
import useLocalStorage from "../hooks/useLocalStorage";

type UserObject = {
  username: string;
  password: string;
};

type AppContextData = {
  movies: Array<any>;
  getMovies: Function;
  setMovies: Function;
  moviesPagination: {
    currentPage: number;
    totalPages: number;
  };
  currentUser: string;
  loginUser: (userInfo: UserObject) => void;
  logoutUser: () => void;
  addMovie: (id: string) => void;
  removeMovie: (id: string) => void;
  catalogMovies: Array<any>;
  getCatalog: () => void;
  verifyAuth: () => void;
};

export const AppContext = createContext({} as AppContextData);

type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [movies, setMovies] = useLocalStorage([], "movies");
  const [moviesPagination, setMoviesPagination] = useLocalStorage(
    {},
    "moviesPagination"
  );
  const [catalogMovies, setCatalogMovies] = useLocalStorage(
    [],
    "catalogMovies"
  );
  const [token, setToken] = useLocalStorage("", "token");
  const [currentUser, setCurrentUser] = useLocalStorage("", "user");

  const router = useRouter();

  async function getMovies(page?: number) {
    await axios
      .get(apiUrl + "/movie" + `?page=${page || 1}`)
      .then((response) => {
        setMovies(response.data.movies);
        setMoviesPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
        console.log(response.data);
      });
  }

  async function getCatalog() {
    await axios
      .get(apiUrl + "/movie/catalog", {
        params: {
          token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCatalogMovies(response.data.catalog);
      })
      .catch((error) => console.log(error.response));
  }

  async function addMovie(id: string) {
    const selectedMovie = movies.find((movie: any) => movie.id === id);

    await axios
      .post(
        apiUrl + "/movie/catalog",
        {
          movie: selectedMovie,
        },
        {
          params: {
            token,
          },
        }
      )
      .then((response) =>
        setCatalogMovies([...catalogMovies, response.data.movie])
      )
      .catch((error) => console.log(error.response));
  }

  async function removeMovie(id: string) {
    const editedId = id.replace("/title/", "").replace("/", "");

    const filteredMovies = catalogMovies.filter(
      (movie: any) => movie.id !== id
    );
    setCatalogMovies(filteredMovies);

    await axios
      .delete(apiUrl + "/movie/catalog/" + editedId, {
        params: {
          token,
        },
      })
      .catch((error) => console.log(error.response));
  }

  async function loginUser(userInfo: UserObject) {
    await axios
      .post(apiUrl + "/user", userInfo)
      .then((response) => {
        setToken(response.data.token);
        setCurrentUser(response.data.username);
        router.push("/");
      })
      .catch((error) => console.log(error.response));
  }

  async function verifyAuth() {
    if (!currentUser) {
      router.push("/");
    }
  }

  function logoutUser() {
    setCurrentUser("");
    setToken("");
    setCatalogMovies([]);
    router.push("/");
  }

  return (
    <AppContext.Provider
      value={{
        movies,
        setMovies,
        getMovies,
        moviesPagination,
        currentUser,
        loginUser,
        addMovie,
        logoutUser,
        catalogMovies,
        getCatalog,
        verifyAuth,
        removeMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return useContext(AppContext);
};
