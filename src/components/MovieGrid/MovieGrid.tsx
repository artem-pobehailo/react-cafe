import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  muvies: Movie[];
  onSelect: (results: Movie) => void;
}

export default function MovieGrid({ muvies, onSelect }: MovieGridProps) {
  if (!muvies || muvies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {muvies.map((muvie) => (
        <li key={muvie.id}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${muvie.poster_path}`}
              alt={muvie.title}
              onClick={() => onSelect(muvie)}
              loading="lazy"
            />
            <h2 className={css.title}>{muvie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
