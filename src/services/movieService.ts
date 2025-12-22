import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesProps {
  results: Movie[];
  page?: number;
  total_pages: number;
  total_results?: number;
}

export default async function fetchMovies(query: string, page: number) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<FetchMoviesProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}


