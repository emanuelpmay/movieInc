import { useContext, useEffect, useState } from 'react';
import movieDB from '../services/movieDB';
import { Movie, MovieDBResponse } from '../interfaces/movieInterface';
import { MovieContext } from '../context/MovieContext';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
  });
  const { setMovies } = useContext(MovieContext);
  const getMovies = async () => {
    const responseNow = movieDB.get<MovieDBResponse>('/movie/now_playing');
    const topRatedPromise = movieDB.get<MovieDBResponse>('/movie/top_rated');

    const response = await Promise.all([responseNow, topRatedPromise]);

    response[0].data.results.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase()
        ? 1
        : a.title.toLowerCase() < b.title.toLowerCase()
        ? -1
        : 0,
    );
    setMovies(response[0].data.results);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return { ...moviesState, isLoading };
};
