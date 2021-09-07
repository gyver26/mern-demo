import { useQuery } from "react-query";
import api from "../services/axios";

const useMovies = (page) => {
  return useQuery(["movies", page], async () => {
    const { data } = await api.get(`/movies?page=${page}&preview=1`);
    return data;
  });
};

export default useMovies;
