import React, { createContext, useReducer } from 'react';
import { Movie } from '../interfaces/movieInterface';
import { movieReducer } from './movieReducer';

export interface MoviesAppState {
  favorites: Movie[];
  movies?: Movie[];
}

export const moviesInitialState: MoviesAppState = {
  favorites: [],
  movies: [],
};

export interface MoviesContextProps {
  moviesAppState: MoviesAppState;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  setMovies: (movies: Movie[]) => void;
}

export const MovieContext = createContext({} as MoviesContextProps);

export const MovieProvider = ({ children }: any) => {
  const [moviesAppState, dispatch] = useReducer(
    movieReducer,
    moviesInitialState,
  );

  const addToFavorites = (id: number) => {
    dispatch({ type: 'addFavorite', payload: id });
  };
  const removeFromFavorites = (id: number) => {
    dispatch({ type: 'removeFavorite', payload: id });
  };

  const setMovies = (movies: Movie[]) => {
    dispatch({ type: 'setMovies', payload: movies });
  };

  return (
    <MovieContext.Provider
      value={{
        moviesAppState,
        addToFavorites,
        removeFromFavorites,
        setMovies,
      }}>
      {children}
    </MovieContext.Provider>
  );
};
