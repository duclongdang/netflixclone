import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Zjc3MDBjMjk5M2MxODczN2I5Nzg0N2YxZGVjYTBiNiIsIm5iZiI6MTc0MDQ3OTEzNy4zNDUsInN1YiI6IjY3YmQ5YWExNzY5MDRjNTljODVlOWI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VPewps1Dxj7qGLApmr0-XEAxYCE44EL2prfmO-gdYiU",
//   },
// };

// fetch(
//   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//   options
// )
//   .then((res) => res.json())
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

export const fetchFromTMDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB " + response.statusText);
  }
  // console.log("fetched data from TMDB");
  return response.data;
};
