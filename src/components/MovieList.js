import React from "react";

const MovieList = (props) => {
	const FavouriteComponents = props.favouriteComponents;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className="image-container d-flex justify-content-start m-3 movie-poster">
					<img src={movie.Poster} alt="movie poster pic"></img>
					<div
						className="overlay d-flex align-items-center justify-center"
						onClick={() => props.handleFavouritesClick(movie)}
					>
						<FavouriteComponents />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
