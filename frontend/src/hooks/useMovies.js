import { useQuery } from "react-query";
import api from "../services/axios";

const useMovies = (page, filters) => {
  return useQuery(["movies", page, filters], async () => {
    const params = new URLSearchParams({
      page,
    });

    if (filters.name) {
      params.append("name", filters.name);
    }

    const { data } = await api.get(`/movies?${params.toString()}`);
    return data;
  });
};

export default useMovies;
