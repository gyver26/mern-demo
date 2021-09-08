import React from "react";
import useMovie from "../../hooks/useMovie";

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

export default MovieOverlay;
