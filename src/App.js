import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddToFavourites from "./components/AddToFavourites";
import ErrorHandle from "./components/ErrorHandle";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  // const {token,setToken}=useToken();

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  //Error handle 404
  const [show, setShow] = useState(false);

  // const resetForm = () => {};
  // const {movieTicket,setMovieTicket}=UseMovieToken();

  async function getMovieRequest(searchValue) {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=fce6452a`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson,'sssssssssssssssssssssssss')

    if (responseJson.Search) {
      console.log(responseJson);
      setMovies(responseJson.Search);
      setShow(false);
    } else {
      setShow(true);
    }
    if (searchValue.length === 0) {
      setShow(false);
    }
  }

  //Function for Search
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  //Function for Favorites
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    //We need to check weither the local storage has data or not , if not then return false and we do not populate the map function of "favorites" array
    //check if Data we fetching from localStorage not empty
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];

    const  checkFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID === movie.imdbID
    );

    // console.log(checkFavouriteList.length);
    // console.log(favourites);

    if (checkFavouriteList.length === 0) {
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
      console.log("Added");
    } else {
      alert("Added To Fav!!");
      console.log("Movie Already added to Fav");
    }
  };

  const removeFavouritesMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  // if(!token){
  //   return <Login2 setToken={setToken}/>
  // }

  return (
    <div className="container-fluid movie-app">
      <BrowserRouter>
        <Switch>
          <Route path="/yajatjaiswal/WebFlix">
            <h1>Search Movies here</h1>

            {/* Input Container  */}
            <div className="d-flex">
              <SearchBox
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <input className="border-0 rounded mx-2 bg-white text-black"
                type="reset"
                value="Reset Form"
                onClick={() => window.location.reload(false)}
              />
            </div>

            {/* <Dashboard /> */}
            <div className="row d-flex align-items-center mt-4 mb-4">
              <MovieListHeading heading="Movies" />
            </div>

            {/* Searched Movies  */}
            <div className="mainContainer">
              <div className="row searchdata">
                <MovieList
                  movies={movies}
                  favouriteComponent={AddToFavourites}
                  handleFavouritesClick={addFavouriteMovie}
                />
                <ErrorHandle show={show} />
              </div>
            </div>

            {/* favorite List */}
            <div className="row">
              <MovieListHeading heading="Favourites" />
            </div>
            <div className="row">
              <MovieList
                movies={favourites}
                handleFavouritesClick={removeFavouritesMovie}
                favouriteComponent={RemoveFavourites}
              />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
