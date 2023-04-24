import { AuthState } from './AuthContext';

type AuthAction =
  | {
      type: 'signIn';
      payload: string;
    }
  | {
      type: 'signOut';
    };

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signIn':
      return { ...state, isLogIn: true, sessionId: action.payload };
    case 'signOut':
      return {
        ...state,
        isLogIn: false,
        sessionId: undefined,
      };
    default:
      return state;
  }
};
