import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const perPage = req.query.perPage ? parseInt(req.query.perPage, 10) : 30;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      perPage,
    });

    let response = {
      page: page,
      entries_per_page: perPage,
      filters: filters,
      total_results: totalNumMovies,
      movies: moviesList,
    };
    res.json(response);
  }
}
