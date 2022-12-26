import React from 'react';
import '../Stylesheet/MoviList.css';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container'>
                    <div className='row'>
                    <img src={movie.Poster} alt='movie'></img>
					<div
					onClick={()=>props.handleFavouritesClick(movie)}
					className='overlay d-flex align-items-center justify-content-center'>
						<FavouriteComponent />
					</div>

                    </div>
					
				</div>
			))}
		</>
	);
};

export default MovieList;