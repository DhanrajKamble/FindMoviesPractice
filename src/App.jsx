import { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";


// this is the TMDB end point URL
const API_BASE_URL = 'https://api.themoviedb.org/3'
// constant variables are written like this
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [movieList, setMovieList] = useState([]);
  // fetching data from API will take time, untill we have to display the loading signs
  const [isLoading, setIsLoading] = useState(false);

  // function for fetching movies
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      // console.log(response);
      // alert(response.ok)

      // If this error is inside a useEffect or async function, React rerenders the component, causing the error to show in the browser.
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json()

      // TMDB error handling
      if (data.status_code) {
        setErrorMessage(data.status_message || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      console.log(data.results[0].poster_path);


    } catch (error) {
      // Even we can display this error on Browser using useState() hook
      console.error(`Error fetching movies : ${error}`);
      setErrorMessage(`Error fetching movies : ${error}`)
    } finally {
      // console.log("Definitily Run This one");
      setIsLoading(false);
    }
  }

  // Calling the fetchMovies() instantly when components are loaded
  useEffect(() => {
    fetchMovies();
  }, [])

  console.log(movieList);

  return (
    <main>
      <div>
        <header className="heading">
          <img className="logo" src="./logo.png" />
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="header-content"> Find <span>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>

        <section>
          <h2>All Movies</h2>
          {/* Displaying the error message which we caught */}
          {/* {errorMessage && <p>{errorMessage}</p>} */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                 <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
          }
        </section>

      </div>
    </main>
  )
}

export default App
