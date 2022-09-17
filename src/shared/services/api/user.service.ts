import { useCallback } from 'react';
import { api } from './axios-config';

export const handleSignUp = useCallback(
  async (name: string, email: string, password: string) => {
    await api.post('/auth/signup', { name, email, password }).then(res => {
      console.log(res);
    });
  },
  []
);
