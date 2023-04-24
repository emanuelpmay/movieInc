import React, { useState } from 'react';
import movieDB from '../services/movieDB';
import { SessionResponse } from '../interfaces/autoInterface';
import { Alert } from 'react-native';

export const useLogin = (
  signIn: (session_id: string, expires_at: string) => void,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const { data } = await movieDB.get<SessionResponse>(
      '/authentication/guest_session/new',
    );
    setIsLoading(false);
    if (data.success) {
      signIn(data.guest_session_id, data.expires_at);
    } else {
      Alert.alert('', data.status_message, [{ text: 'OK', onPress: () => {} }]);
    }
  };
  return { isLoading, handleLogin };
};
