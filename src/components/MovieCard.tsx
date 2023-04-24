import React from 'react';
// import { Cast } from '../interfaces/creditsInterface';
import { Image, StyleSheet, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Movie } from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

interface Props {
  movie: Movie;
}
type MovieNav = StackNavigationProp<any, any>;
export const MovieCard = ({ movie }: Props) => {
  const navigation = useNavigation<MovieNav>();

  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', movie)}>
      <View style={style.container}>
        <Image source={{ uri }} style={style.poster} />

        <View style={style.info}>
          <Text style={style.title}>{movie.title}</Text>
          <Text style={style.subtitle}>{movie.original_title}</Text>
          <Text style={style.subtitle}>{moment(movie.release_date).format('DD-MM-YYYY')}</Text>
          <Text style={style.subtitle}>
            {' '}
            <Icon name="star-outline" size={16} color={'black'} />{' '}
            {movie.vote_average}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  poster: { width: 100, height: 150, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: 'black', flexWrap: 'wrap' },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    flexWrap: 'wrap',
  },
});
