import React, { useContext } from 'react';
import { ActivityIndicator, View, SafeAreaView, Text } from 'react-native';

import { useMovies } from '../hooks/useMovies';
import { MoviesList } from '../components/MoviesList';
import { MovieContext } from '../context/MovieContext';

export const FavoritesScreen = () => {
  const {
    moviesAppState: { favorites },
  } = useContext(MovieContext);

  return (
    <SafeAreaView>
      <MoviesList title="Favoritas" movies={favorites!} />
    </SafeAreaView>
  );
};
