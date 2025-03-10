import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
  // https://api.themoviedb.org/3/search/movie?query=hero%20academia&include_adult=false&language=en-US&page=1
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson : ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie : ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchTv : ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error search history " + error.message,
    });
  }
}

export async function clearSearchHistory(req, res) {
  //trong req đa co user
  try {
  } catch (error) {}
}

export async function removeItemFromSearchHistory(req, res) {
  const { id } = req.params;
  console.log("id", typeof id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id: parseInt(id) } },
    });

    res
      .status(200)
      .json({ success: true, message: "Item " + id + " has been removed" });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory : ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
