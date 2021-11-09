import { Request, Response } from "express";
import axios from "axios";

import { Movie } from "../models/Movie";

const imdbApiHeaders = {
  "x-rapidapi-host": "imdb8.p.rapidapi.com",
  "x-rapidapi-key": "055adf457dmshadbdc1d71d699c7p169513jsn42eb9bf611e2",
};

const list = async (req: Request, res: Response) => {
  const response = await axios.get(
    "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
    {
      headers: imdbApiHeaders,
    }
  );

  // Pagination

  const page = Number(req.query.page) || 1;
  const pageLimit = 9;
  const movies = response.data;

  const startIndex = (page - 1) * pageLimit;
  const endIndex = page * pageLimit;

  const pageMovies = movies.slice(startIndex, endIndex);

  const movieDetails: Array<any> = [];

  for (let i = 0; i < pageMovies.length; i++) {
    const movieId = pageMovies[i].replace("/title/", "").replace("/", "");

    const response = await axios.get(
      "https://imdb8.p.rapidapi.com/title/get-details",
      {
        headers: imdbApiHeaders,
        params: {
          tconst: movieId,
        },
      }
    );

    movieDetails.push(response.data);
  }

  return res.status(200).json({
    movies: movieDetails,
  });
};

const getCatalog = async (req: Request, res: Response) => {
  const catalog = await Movie.find({});

  console.log(catalog);

  return res.status(200).json({ catalog });
};

const addToCatalog = async (req: Request, res: Response) => {
  const { movie } = req.body;

  console.log(movie);

  const movieToAdd = await Movie.findOne({ id: movie.id });

  if (movieToAdd) {
    return res
      .status(401)
      .json({ error: true, message: "Esse filme já está no seu católogo!" });
  }

  const newMovie = new Movie(movie);
  await newMovie.save();

  res.status(200).json({ error: false, movie: newMovie });
};

export default { list, getCatalog, addToCatalog };
