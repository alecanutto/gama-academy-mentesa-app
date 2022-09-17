import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from '../../pages';

export const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="*" element={<Navigate to="/auth/login" />} />
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/register" element={<Register />} />
  </Routes>
);
