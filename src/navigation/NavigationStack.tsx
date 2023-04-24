import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { TabNavigator } from './TabNavigator';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  Detail: Movie;
};

const Stack = createStackNavigator<RootStackParams>();

export const NavigationStack = () => {
  const {
    authState: { isLogIn },
  } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
        },
      }}>
      {isLogIn ? (
        <>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
