import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigation/NavigationStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { MovieDetail } from '../components/MovieDetail';
import { MovieContext } from '../context/MovieContext';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'Detail'> {}

const { height: screenHeight } = Dimensions.get('window');

export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const {
    addToFavorites,
    removeFromFavorites,
    moviesAppState: { favorites },
  } = useContext(MovieContext);
  
  const {
    authState: { sessionId },
  } = useContext(AuthContext);

  const {
    isLoading,
    movieFullDetail,
    cast,
    similars,
    handleAddFavorites,
    handleDeleteFavorites,
    handleRatingMovie
  } = useMovieDetail({
    movieId: movie.id,
    addToFavorites,
    removeFromFavorites,
    sessionId,
  });

  return (
    <ScrollView>
      <View style={style.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={style.image}
        />
      </View>
      <View style={style.marginContainer}>
        <Text style={style.title}>{movie.title}</Text>
        <Text style={style.subtitle}>{movie.original_title}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={35} color={'gray'} style={{ marginTop: 20 }} />
      ) : (
        <MovieDetail
          movie={movieFullDetail!}
          cast={cast}
          similars={similars}
          favorites={favorites}
          handleAddFavorites={handleAddFavorites}
          handleDeleteFavorites={handleDeleteFavorites}
          handleRatingMovie={handleRatingMovie}
        />
      )}
      <View style={style.backButton}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon color={'white'} name="arrow-back-outline" size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
    // borderRadius: 18,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  image: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 10,
  },
});
