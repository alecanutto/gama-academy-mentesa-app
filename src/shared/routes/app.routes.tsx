import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../../pages';
import { PatientsTable } from '../../pages/patients/PatientsTable';
import { Profile } from '../../pages/profile/ProfileForm';
import { SideMenu } from '../components/sideMenu';
import { useDrawerContext } from '../contexts';

export const AppRoutes: React.FC = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/dashboard',
        label: 'Página inicial',
      },
      {
        icon: 'person',
        path: '/profissional',
        label: 'Profissional',
      },
      {
        icon: 'people',
        path: '/pacientes',
        label: 'Pacientes',
      },
      {
        icon: 'event',
        path: '/sessions',
        label: 'Sessões',
      },
    ]);
  }, []);

  return (
    <SideMenu>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profissional" element={<Profile />} />
        <Route path="/pacientes" element={<PatientsTable />} />
      </Routes>
    </SideMenu>
  );
};
