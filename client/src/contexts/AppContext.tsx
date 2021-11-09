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
  currentUser: string;
  loginUser: (userInfo: UserObject) => void;
  logoutUser: () => void;
  addMovie: (id: string) => void;
  catalogMovies: Array<any>;
  getCatalog: () => void;
};

export const AppContext = createContext({} as AppContextData);

type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [movies, setMovies] = useLocalStorage([], "movies");
  const [catalogMovies, setCatalogMovies] = useLocalStorage(
    [],
    "catalogMovies"
  );
  const [token, setToken] = useLocalStorage("", "token");
  const [currentUser, setCurrentUser] = useLocalStorage("", "user");

  async function getMovies() {
    await axios.get(apiUrl + "/movie").then((response) => {
      setMovies(response.data.movies);
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
      .then((response) => setCatalogMovies(response.data.catalog));
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
      );
  }

  async function loginUser(userInfo: UserObject) {
    await axios
      .post(apiUrl + "/user", userInfo)
      .then((response) => {
        setToken(response.data.token);
        setCurrentUser(response.data.username);
        console.log("token", token);
      })
      .catch((error) => console.log(error.response));
  }

  function logoutUser() {
    setCurrentUser("");
    setToken("");
  }

  return (
    <AppContext.Provider
      value={{
        movies,
        getMovies,
        currentUser,
        loginUser,
        addMovie,
        logoutUser,
        catalogMovies,
        getCatalog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return useContext(AppContext);
};
