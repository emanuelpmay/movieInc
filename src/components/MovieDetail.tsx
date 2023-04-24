import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating-widget';
import { Movie, MovieFullDetail } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import { HorizontalSlider } from './HorizontalSlider';

import { CastCard } from './CastCard';
import { useState } from 'react';

interface Props {
  movie: MovieFullDetail;
  cast: Cast[];
  similars: Movie[];
  favorites: Movie[];
  handleAddFavorites: () => void;
  handleDeleteFavorites: () => void;
  handleRatingMovie: (value: number) => void;
}

export const MovieDetail = ({
  cast,
  movie,
  similars,
  handleAddFavorites,
  handleDeleteFavorites,
  favorites,
  handleRatingMovie,
}: Props) => {
  const [rating, setRating] = useState(0);

  const handleEndRating = () => {
    handleRatingMovie(rating);
  };

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>
            <Icon name="star-outline" color={'gray'} size={16} />{' '}
            {movie.vote_average}
          </Text>
          <Text>{movie.genres.map(g => g.name).join(', ')}</Text>
        </View>
        <View>
          {favorites?.some(f => f.id === movie.id) ? (
            <TouchableOpacity onPress={handleDeleteFavorites}>
              <Text>
                <Icon name="heart" color={'firebrick'} size={40} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAddFavorites}>
              <Text>
                <Icon name="heart-outline" color={'gray'} size={40} />
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={style.title}>Descripción</Text>
      <Text style={{ fontSize: 16 }}>{movie.overview}</Text>
      <Text style={style.title}>Actores</Text>
      <FlatList
        data={cast}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          height: 70,
          marginBottom: 20,
        }}
        renderItem={({ item }) => <CastCard actor={item} />}
      />
      <Text style={style.title}>Califica esta película</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          marginVertical: 20,
        }}>
        <StarRating
          rating={rating}
          onChange={setRating}
          onRatingEnd={handleEndRating}
          maxStars={10}
          starSize={25}
          enableHalfStar
          enableSwiping
        />
      </View>
      {similars.length > 0 && (
        <HorizontalSlider title="Títulos similares" movies={similars} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
