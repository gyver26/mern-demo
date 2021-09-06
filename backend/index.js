import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import moviesDAO from "./dao/moviesDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MOVIES_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 5000,
})
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await moviesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
