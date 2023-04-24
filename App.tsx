import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/NavigationStack';
import { MovieProvider } from './src/context/MovieContext';
import { TabNavigator } from './src/navigation/TabNavigator';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <NavigationStack />
        {/* <TabNavigator /> */}
      </AppState>
    </NavigationContainer>
  );
};

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <MovieProvider>{children}</MovieProvider>
    </AuthProvider>
  );
};

export default App;
