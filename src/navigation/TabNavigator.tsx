import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

import { NavigationStack } from './NavigationStack';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { colors } from '../theme/theme';
import { HomeScreen } from '../screens/HomeScreen';

const BottomTabNavigator = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 9,
        },
        tabBarIcon: ({ color }) => {
          let iconName: string = '';
          switch (route.name) {
            case 'HomeTab':
              iconName = 'home-outline';
              break;
            case 'FavTab':
              iconName = 'heart-outline';
              break;
          }
          return (
            <Text style={{ color: color }}>
              <Icon name={iconName} size={20} color={color} />
            </Text>
          );
        },
      })}>
      <BottomTabNavigator.Screen
        name="HomeTab"
        options={{ title: 'Home', tabBarActiveTintColor: colors.primary }}
        component={HomeScreen}
      />
      <BottomTabNavigator.Screen
        name="FavTab"
        options={{ title: 'Favoritas', tabBarActiveTintColor: colors.primary }}
        component={FavoritesScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};
