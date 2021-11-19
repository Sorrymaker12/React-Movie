import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavorites";
import removeFavourites from "./components/removeFavourites";

const App = () => {
	const [movies, setMovies] = useState([]);

	const [searchValue, setSearchValue] = useState("");

	const [favourites, setFavourites] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a180c285`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
	};

	return (
		<div className="container-fluid movie-app">
			<div className="row d-flex align-items-center mt-4 mb-4 heading-all">
				<MovieListHeading heading="Movies" />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className="row">
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponents={AddFavourite}
				/>
			</div>
			<div className="row d-flex align-items-center mt-4 mb-4 heading-all">
				<MovieListHeading heading="Favourites" />
			</div>
			<div className="row">
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponents={removeFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
