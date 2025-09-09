import { createContext, useContext, useState } from 'react';
import { logout as sessionClear } from '../api/auth';

const initialState = {
  user: null,
  login: () => {},
  logout: async () => {}
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <AuthContext.Provider value={{ 
        user: state.user, 
        login: (user) => {
            if(user?.token) localStorage.setItem('token', user?.token);
            setState((prev) => ({
              ...prev,
              user : user,
            }));
        },
        logout: async () => {
            localStorage.removeItem('token')
            await sessionClear();
            setState((prev) => ({
                ...prev,
                user: null
            }));    
        }
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
