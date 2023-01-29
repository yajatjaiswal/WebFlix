import React from "react";
import "../Stylesheet/MoviList.css";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        //here index is not used so i added it here using key
        <div className="image-container" key={index}>
          <div className="row position-relative">
            <img src={movie.Poster} alt="movie"></img>
            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
              
            >
              <FavouriteComponent />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
