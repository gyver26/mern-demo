import React, { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../services/axios";

function MovieCard(props) {
  const {
    movie: { title, poster },
  } = props;
  return (
    <div
      className="w-60 h-96 m-2 shadow-lg bg-black cursor-pointer hover:bg-gray-600 bg-cover bg-center "
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div className="h-full w-full flex items-center justify-center text-center opacity-0 bg-black hover:opacity-100 bg-opacity-70 transition delay-75 hover:border-red-600 border-4 border-opacity-0">
        {title}
      </div>
    </div>
  );
}

function Movies() {
  const { isLoading, error, data } = useQuery("movies", async () => {
    const { data } = await api.get("/movies");

    return data;
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mx-auto p-4 text-white flex flex-wrap justify-center">
      {data?.movies?.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
}

export default Movies;
