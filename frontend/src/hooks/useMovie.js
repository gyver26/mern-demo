import { useQuery } from "react-query";
import api from "../services/axios";

const useMovie = (movieId) => {
  return useQuery(["movie", movieId], async () => {
    if (movieId) {
      const { data } = await api.get(`/movies/id/${movieId}`);

      return data;
    }
  });
};

export default useMovie;
