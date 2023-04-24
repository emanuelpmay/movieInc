import React from 'react';
import { ActivityIndicator, View, SafeAreaView, Text } from 'react-native';

import { useMovies } from '../hooks/useMovies';
import { MoviesList } from '../components/MoviesList';

export const HomeScreen = () => {
  const { nowPlaying, isLoading } = useMovies();
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <MoviesList title="Ahora en cines" movies={nowPlaying} />
    </SafeAreaView>
  );
};
