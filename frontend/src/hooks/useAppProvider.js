import { useState } from "react";

const useAppProvider = () => {
  const [moviesSearch, setMoviesSearch] = useState("");
  const [theaterSearch, setTheaterSearch] = useState("");

  return {
    moviesSearch,
    setMoviesSearch,
    theaterSearch,
    setTheaterSearch,
  };
};

export default useAppProvider;
