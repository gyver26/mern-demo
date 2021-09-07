import React, { useEffect, useState } from "react";
import useMovie from "../../hooks/useMovie";
import useMovies from "../../hooks/useMovies";

function PaginationControls(props) {
  const { onNext, onPrev, currPage, lastPage } = props;
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        disabled={currPage === 0}
        className="disabled:opacity-60  text-white bg-red-600 p-2 rounded-sm w-20 mx-1"
        onClick={onPrev}
      >
        Prev
      </button>
      <button
        disabled={lastPage <= currPage}
        className="disabled:opacity-60 text-white bg-red-600 p-2 rounded-sm w-20 mx-1"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

function MovieCard(props) {
  const {
    movie: { title, poster },
    onClick,
  } = props;
  return (
    <div
      className="w-52 h-80 m-2 shadow-lg bg-black cursor-pointer hover:bg-gray-600 bg-cover bg-center "
      style={{ backgroundImage: `url(${poster})` }}
      onClick={onClick}
    >
      <div className="p-4 h-full w-full flex items-center justify-center text-center opacity-0 bg-black hover:opacity-100 bg-opacity-70 transition delay-75 hover:border-red-600 border-4 border-opacity-0">
        {title}
      </div>
    </div>
  );
}

function MovieOverlay(props) {
  const { open, movieId, onClose } = props;
  const { data: movie } = useMovie(movieId);

  if (!open) {
    return null;
  } else if (movie) {
    return (
      <>
        <div
          className="fixed bg-gray-800 bg-opacity-70 top-0 left-0 w-full h-full"
          onClick={onClose}
        ></div>
        <div className="container max-h-full bg-black fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 overflow-auto text-white grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center h-full col-span-2 md:col-span-1">
            <img className="h-full" src={movie.poster} alt={movie.title} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-xl mb-8 text-red-600">
              {movie.title}
            </h3>
            <p className="mb-4">{movie.plot}</p>
            <div>
              <span className="font-bold">Year:</span>{" "}
              {movie?.year ? movie.year : "N/A"}
            </div>
            <div>
              <span className="font-bold">
                {movie?.genres?.length > 1 ? "Genres" : "Genre"}:
              </span>{" "}
              {movie?.genres?.length > 0 ? movie.genres.join(", ") : "N/A"}
            </div>
            <div>
              <span className="font-bold">
                {movie?.directors?.length > 1 ? "Directors" : "Director"}:
              </span>{" "}
              {movie?.directors?.length > 0
                ? movie.directors.join(", ")
                : "N/A"}
            </div>
            <div>
              <span className="font-bold">
                {movie?.cast?.length > 1 ? "Casts" : "Cast"}:
              </span>{" "}
              {movie?.cast?.length > 0 ? movie.cast.join(", ") : "N/A"}
            </div>
            <div>
              <span className="font-bold">IMDB:</span>{" "}
              {movie?.imdb?.rating || "N/A"}
            </div>
            <div>
              <span className="font-bold">Tomatoes:</span> Viewer -{" "}
              {movie?.tomatoes?.viewer?.rating || "N/A"}, Critic -{" "}
              {movie?.tomatoes?.critic?.rating || "N/A"}
            </div>
            <div>
              <span className="font-bold">Runtime:</span> {`${movie?.runtime}m`}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

function Movies() {
  const [page, setPage] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data } = useMovies(page);
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
