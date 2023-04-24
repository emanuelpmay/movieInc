import { MoviesAppState } from './MovieContext';
import { Movie } from '../interfaces/movieInterface';

type MovieAction =
  | {
      type: 'addFavorite';
      payload: number;
    }
  | { type: 'removeFavorite'; payload: number }
  | { type: 'setMovies'; payload: Movie[] };

export const movieReducer = (
  state: MoviesAppState,
  action: MovieAction,
): MoviesAppState => {
  switch (action.type) {
    case 'setMovies':
      return { ...state, movies: action.payload };
    case 'addFavorite':
      if (state.movies!.some(m => m.id === action.payload)) {
        const { movies } = state;

        return {
          ...state,
          favorites: [
            ...state.favorites!,
            ...movies!.filter(m => m.id === action.payload),
          ],
        };
      } else {
        return { ...state };
      }
    case 'removeFavorite':
      const { favorites } = state;

      return {
        ...state,
        favorites: [...favorites!.filter(m => m.id !== action.payload)],
      };
  }
};
