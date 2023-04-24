import { useContext } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);

  const { isLoading, handleLogin } = useLogin(signIn);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 20,
          textAlign: 'center',
        }}>
        <Icon name="person-circle-outline" size={80} color="gray" />
      </Text>
      <View>
        {isLoading ? (
          <ActivityIndicator
            size={35}
            color={'gray'}
            style={{ marginTop: 20 }}
          />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}
      </View>
    </SafeAreaView>
  );
};
