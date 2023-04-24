import React from 'react';
import { FlatList } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MovieCard } from './MovieCard';
import { Text } from 'react-native';

interface Props {
  title: string;
  movies: Movie[];
}

export const MoviesList = ({ title, movies }: Props) => {
  return (
    <>
      <Text
        style={{
          fontSize: 25,
          marginTop: 20,
          marginLeft: 20,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <FlatList
        style={{
          marginBottom: 55
        }}
        data={movies}
        renderItem={({ item }: any) => <MovieCard movie={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};
