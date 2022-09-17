import { useAuthContext } from '../contexts';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const IndexRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};
