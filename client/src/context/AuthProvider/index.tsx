import {
  createContext, ReactNode, useContext, useMemo,
} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import getFromLocalStorage from '../../utils/helpers/storage';
import TokenService from '../../services/TokenService';

interface AuthContextType {
    user: string;
    signIn: (email: string, callback: () => void) => void;
    signOut: (callback: () => void) => void;
}

interface RequireAuthProps {
    children: ReactNode | ReactNode[] | any;
}

// ToDo - change to real auth api service
const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(callback: () => void) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signOut(callback: any) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

const AuthContext = createContext<AuthContextType>({
  user: '',
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('authProvider');

  const signIn = (newUser: string, callback: () => void) => fakeAuthProvider
    .signIn(() => {
      setUser(newUser);
      callback?.();
    });

  const signOut = (callback: () => void) => fakeAuthProvider
    .signOut(() => {
      setUser(null);
      localStorage.clear();
      callback?.();
    });

  const value = { user, signIn, signOut };

  const memoValue = useMemo(() => value, [value]);

  // @ts-ignore
  return <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();
  const location = useLocation();

  // if (!localStorage.getItem('login')) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return children;
};

export {
  AuthProvider,
  useAuth,
  RequireAuth,
};
