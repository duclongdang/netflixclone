import express from "express";
import authRoute from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import movieRoute from "./routes/movie.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //req.body (parse body)

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
  connectDB();
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => console.log("Checked "))
  .catch((err) => console.error(err));
