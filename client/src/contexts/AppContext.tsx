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
  addMovie: (id: string) => void;
};

export const AppContext = createContext({} as AppContextData);

type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [movies, setMovies] = useLocalStorage([], "movies");
  const [token, setToken] = useLocalStorage("", "token");
  const [currentUser, setCurrentUser] = useLocalStorage("", "user");

  const router = useRouter();

  async function getMovies() {
    await axios.get(apiUrl + "/movie").then((response) => {
      setMovies(response.data.movies);
      console.log(response.data);
    });
  }

  async function addMovie(id: string) {
    const selectedMovie = movies.find((movie: any) => movie.id === id);

    console.log(selectedMovie);
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

  return (
    <AppContext.Provider
      value={{ movies, getMovies, currentUser, loginUser, addMovie }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return useContext(AppContext);
};
