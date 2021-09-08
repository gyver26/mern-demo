import React from "react";

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

export default MovieCard;
