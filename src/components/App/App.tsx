import { useState } from "react";
import Cafeinfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";

import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type { VotesProps } from "../../types/Votes";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [votes, setVotes] = useState<VotesProps>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (key: keyof VotesProps) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [key]: prevVotes[key] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const canReset = votes.good > 0 || votes.neutral > 0 || votes.bad > 0;
  const totalVotes = votes.bad + votes.good + votes.neutral;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(query);
      console.log("Results from API:", results);
      if (!results || results.length === 0) {
        toast.error("No movies found for your request.");

        return;
      }
      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }
  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <div className={css.app}>
      <Cafeinfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}

      <>
        <SearchBar onSubmit={handleSearch} />
        <Toaster position="top-center" />
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && movies.length > 0 && (
          <MovieGrid results={movies} onSelect={handleSelectMovie} />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </>
    </div>
  );
}
