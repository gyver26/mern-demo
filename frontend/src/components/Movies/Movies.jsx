import React, { useState } from "react";
import useMovies from "../../hooks/useMovies";
import PaginationControls from "./PaginationControls";
import MovieCard from "./MovieCard";
import MovieOverlay from "./MovieOverlay";
import useAppContext from "../../hooks/useAppContext";
import useDebounce from "../../hooks/useDebounce";

function Movies() {
  const [page, setPage] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const { moviesSearch } = useAppContext();
  const debouncedSearch = useDebounce(moviesSearch, 500);
  const { data } = useMovies(page, { name: debouncedSearch });
  const getNextPage = () => {
    setPage((currPage) => currPage + 1);
  };

  const getPrevPage = () => {
    if (page === 0) return;
    setPage((currPage) => currPage - 1);
  };

  const handlePreviewOpen = (movie) => {
    setPreviewOpen(true);
    setSelectedMovie(movie);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto p-4 text-white flex flex-wrap justify-center mb-12">
        {data?.movies?.map((movie, key) => (
          <MovieCard
            key={`movie-card-${key}`}
            movie={movie}
            onClick={() => handlePreviewOpen(movie)}
          />
        ))}
      </div>
      <PaginationControls
        currPage={page}
        lastPage={data?.last_page || 0}
        onPrev={getPrevPage}
        onNext={getNextPage}
      />
      <MovieOverlay
        open={previewOpen}
        movieId={selectedMovie._id}
        onClose={handlePreviewClose}
      />
    </div>
  );
}

export default Movies;
