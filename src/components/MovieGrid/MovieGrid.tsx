import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  results: Movie[];
  onSelect: (results: Movie) => void;
}

export default function MovieGrid({ results, onSelect }: MovieGridProps) {
  if (!results || results.length === 0) return null;

  return (
    <ul className={css.grid}>
      {results.map((result) => (
        <li key={result.id}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title}
              onClick={() => onSelect(result)}
              loading="lazy"
            />
            <h2 className={css.title}>{result.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
