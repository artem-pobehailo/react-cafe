import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesProps {
  results: Movie[];
}

export default async function fetchMovies(query: string) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<FetchMoviesProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.results;
}
