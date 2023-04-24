import React from 'react';
import { Movie } from '../interfaces/movieInterface';
import { FlatList, Text, View } from 'react-native';
import { MoviePoster } from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    <View
      style={{
        height: title ? 270 : 220,
        marginTop: 20
      }}>
      {title && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20
          }}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({ item }: any) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
