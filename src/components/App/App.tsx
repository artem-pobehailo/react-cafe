import { useEffect, useState } from "react";
import Cafeinfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";

import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type { VotesProps } from "../../types/Votes";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";

import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import NoteList from "../NoteList/NoteList";
import fetchNotes from "../../services/noteService";
import type { FetchNotesResponse } from "../../types/note";
import Pagination from "../Pagination/Pagination";
import SearchBarNotes from "../SearchBox/SearchBox";
import ModalNotes from "../ModalNotes/Modal";
import NoteForm from "../NoteForm/NoteForm";

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

  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== "",
    placeholderData: keepPreviousData,
  });

  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }
  function handleCloseModal() {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (!isLoading && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isLoading]);

  const [perPage, setPerPage] = useState(12);
  const {
    data: dataNote,
    isLoading: isLoadingNote,
    isError: isErrorNote,
  } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, perPage],
    queryFn: () => fetchNotes({ page, perPage }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

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
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && data && (
          <MovieGrid muvies={data.results} onSelect={handleSelectMovie} />
        )}

        {data && data.total_pages > 1 && (
          <ReactPaginate
            pageCount={data.total_pages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </>

      <div className={css.app}>
        <header className={css.toolbar}>
          <>
            <SearchBarNotes onSubmit={handleSearch} />

            {dataNote && dataNote.totalPages > 1 && (
              <Pagination
                totalPages={dataNote.totalPages}
                page={page}
                setPage={setPage}
              />
            )}
            <div>
              <button className={css.button} onClick={openModal}>
                Create note +
              </button>
              {isModalOpen && (
                <ModalNotes onClose={closeModal}>
                  <NoteForm onSuccess={closeModal} />
                </ModalNotes>
              )}
            </div>
          </>
        </header>
        {isLoadingNote && <Loader />}
        {isErrorNote && <ErrorMessage />}
        {dataNote && dataNote.notes.length > 0 && (
          <NoteList notes={dataNote.notes} />
        )}
      </div>
    </div>
  );
}
