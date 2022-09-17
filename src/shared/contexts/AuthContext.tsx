import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { api } from '../services/api/axios-config';

interface IUser {
  id: number;
  email: string;
}

interface IAuthContextData {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

const ACCESS_TOKEN = 'MENTE_SA_ACCESS_TOKEN';

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    await api
      .post('/auth/login', { email, password })
      .then(res => {
        const { token, data } = res.data.accessToken;
        if (res.status === 200) {
          setUser(data);
          setAccessToken(token);
          localStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));
        }
      })
      .catch(err => setError(err.response.data.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
