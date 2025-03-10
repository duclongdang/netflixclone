import express from "express";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //req.body (parse body)
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoute);

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
