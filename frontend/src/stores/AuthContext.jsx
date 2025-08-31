import { createContext, useContext, useState } from 'react';
import { logout as sessionClear } from '../api/auth';
import AutoAuth from './AutoAuth';

const initialState = {
  user: null,
  justLoggedIn: false,
  login: () => {},
  logout: async () => {}
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <AuthContext.Provider value={{ 
        user: state.user, 
        justLoggedIn: state.justLoggedIn,
        login: (user, justLoggedIn = true) => {
            setState((prev) => ({
                ...prev,
                user : user,
                justLoggedIn: justLoggedIn
            }));
        },
        logout: async () => {
            await sessionClear();
            setState((prev) => ({
                ...prev,
                user: null
            }));    
        }
    }}>
      {children}
      <AutoAuth />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
