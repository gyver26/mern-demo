import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const perPage = req.query.perPage ? parseInt(req.query.perPage, 10) : 30;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const preview = req.query.preview === "1" ? true : false;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      perPage,
      preview,
    });

    let response = {
      page: page,
      entries_per_page: perPage,
      last_page:
        totalNumMovies > perPage ? Math.ceil(totalNumMovies / perPage) - 1 : 0,
      filters: filters,
      total_results: totalNumMovies,
      movies: moviesList,
    };
    res.json(response);
  }

  static async apiGetMovieById(req, res) {
    try {
      const id = req.params.id || {};
      const movie = await MoviesDAO.getMovieById(id);

      if (!movie) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      res.json(movie);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
