import { useEffect, useState } from 'react';
import movieDB from '../services/movieDB';
import {
  Movie,
  MovieDBResponse,
  MovieFullDetail,
  RatingResponse,
} from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { Alert } from 'react-native';
import { API_KEY } from '../constants/constant';

interface movieDetail {
  isLoading: boolean;
  movieFullDetail?: MovieFullDetail;
  cast: Cast[];
  similars: Movie[];
}

interface Props {
  movieId: number;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  sessionId?: string;
}

export const useMovieDetail = ({
  movieId,
  addToFavorites,
  removeFromFavorites,
  sessionId = '',
}: Props) => {
  const [state, setState] = useState<movieDetail>({
    isLoading: true,
    movieFullDetail: undefined,
    cast: [],
    similars: [],
  });

  const getDetail = async () => {
    setState({ ...state, isLoading: true });
    const detailPromise = movieDB.get<MovieFullDetail>(
      `/movie/${movieId.toString()}`,
    );
    const creditsPromise = movieDB.get<CreditsResponse>(
      `/movie/${movieId.toString()}/credits`,
    );
    const similarPromise = movieDB.get<MovieDBResponse>(
      `/movie/${movieId.toString()}/similar`,
    );

    const [detailResponse, creditResponse, similarsResponse] =
      await Promise.all([detailPromise, creditsPromise, similarPromise]);

    setState({
      isLoading: false,
      cast: creditResponse.data.cast,
      similars: similarsResponse.data.results,
      movieFullDetail: detailResponse.data,
    });
  };

  const showAlert = (title: string = '', message: string = '') => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }]);
  };

  const handleAddFavorites = () => {
    addToFavorites(movieId);
    showAlert('', 'Agregado a favoritos');
  };

  const handleDeleteFavorites = () => {
    removeFromFavorites(movieId);
    showAlert('', 'Eliminado de favoritos');
  };

  const handleRatingMovie = async (value: number) => {
    const { data } = await movieDB.post<RatingResponse>(
      `/movie/${movieId}/rating`,
      { value },
      {
        params: {
          api_key: API_KEY,
          guest_session_id: sessionId,
        },
      },
    );

    if (data.success) {
      showAlert('', 'Votacion enviada correctamente');
    } else {
      showAlert('', data.status_message);
    }
  };

  useEffect(() => {
    getDetail();
  }, [movieId]);

  return { ...state, handleAddFavorites, handleDeleteFavorites, handleRatingMovie };
};
