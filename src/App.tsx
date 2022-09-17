import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from './shared/contexts';
import { IndexRoutes } from './shared/routes/index.routes';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <IndexRoutes />
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};
