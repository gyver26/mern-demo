import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let movies;

export default class MoviesDao {
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.MOVIES_NS).collection("movies");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`
      );
    }
  }

  static async getMovies({ filters = null, page = 0, perPage = 20 } = {}) {
    let query;

    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      }
    }

    query = { ...query, poster: { $exists: true } };

    let cursor;

    try {
      cursor = await movies.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }

    const displayCursor = cursor.limit(perPage).skip(perPage * page);

    try {
      const moviesList = await displayCursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
}
