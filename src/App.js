import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import EditMovieForm from "./components/EditMovieForm" //1. \\
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovie from "./components/AddMovie" //6. \\

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //5. \\
  const deleteMovie = (id) => {
    setMovies(movies.filter(val => {
      val.id !== Number(id)
    }))
  }

  const addToFavorites = (movie) => {

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              {/* 1. */}
              <EditMovieForm setMovies={setMovies} />
            </Route>

            {/*  //6.\\ */}
            <Route path="/movies/add" >
              <AddMovie />
            </Route>

            <Route path="/movies/:id">
              {/* //5. \\ */}
              <Movie deleteMove={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div >
  );
};


export default App;

