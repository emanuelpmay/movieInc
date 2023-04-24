import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { authReducer } from './authReducer';

export interface AuthState {
  isLogIn: boolean;
  sessionId?: string;
}

interface SecureStorage {
  sessionId: string;
  expires_at: string;
}

export const authInitialState: AuthState = {
  isLogIn: false,
};

export interface AuthContextProps {
  authState: AuthState;
  signIn: (sessionId: string, expires_at: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  const signIn = async (sessionId: string, expires_at: string) => {
    dispatch({
      type: 'signIn',
      payload: sessionId,
    });
    await AsyncStorage.setItem(
      '@sessionId',
      JSON.stringify({ sessionId, expires_at }),
    );
  };

  const logOut = () => {
    dispatch({ type: 'signOut' });
    AsyncStorage.removeItem('@sessionId');
  };

  const validateSessionId = async () => {
    try {
      const sessionStorage = await AsyncStorage.getItem('@sessionId');
      if (sessionStorage) {
        const { sessionId, expires_at } = JSON.parse(
          sessionStorage,
        ) as SecureStorage;
        if (moment(expires_at, 'YYYY-MM-DDTHH:mm:ssZ').isAfter()) {
          dispatch({
            type: 'signIn',
            payload: sessionId,
          });
        } else {
          dispatch({ type: 'signOut' });
        }
      } else {
        dispatch({ type: 'signOut' });
      }
    } catch (error) {
      dispatch({ type: 'signOut' });
    }
  };

  useEffect(() => {
    validateSessionId();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signOut: logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
