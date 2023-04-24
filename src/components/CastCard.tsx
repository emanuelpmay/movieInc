import React from 'react';
import { Cast } from '../interfaces/creditsInterface';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  actor: Cast;
}
export const CastCard = ({ actor }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

  return (
    <View style={style.container}>
      {actor.profile_path && (
        <Image source={{ uri }} style={style.actorProfile} />
      )}

      <View style={style.info}>
        <Text style={style.name}>{actor.name}</Text>
        <Text style={style.character}>{actor.character}</Text>
      </View>
    </View>
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  info: {
    marginLeft: 10,
  },
  actorProfile: { width: 50, height: 50, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  character: {
    fontSize: 16,
    opacity: 0.7,
  },
});
