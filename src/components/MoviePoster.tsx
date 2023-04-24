import { Image, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/NavigationStack';
import { Movie } from '../interfaces/movieInterface';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

type MovieNav = StackNavigationProp<any, any>;

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
  const navigation = useNavigation<MovieNav>();
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 8,
        paddingBottom: 20,
        paddingHorizontal: 7,
      }}
      onPress={() => navigation.navigate('Detail', movie)}>
      <View style={style.imageContainer}>
        <Image
          source={{
            uri,
          }}
          style={style.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.8,
    elevation: 10,
    borderRadius: 18,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
