import { fetchFromTMDB } from "../services/tmdb.service.js";

// movie/trending
export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//movie/videos
export async function getMovieTrailers(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.response.status !== 404) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
    res.status(404).json({ success: false, message: "Not found" });
  }
}

//movie/details
export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).json({ success: false, message: "Not found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
}

//movie/similar
export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).json({ success: false, message: "Not found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
}

//movie/movielist
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).json({ success: false, message: "Not found" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
}
