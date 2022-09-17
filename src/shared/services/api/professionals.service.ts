import { useCallback } from 'react';
import { api } from './axios-config';

export interface IProfessional {
  id: number;
  name: string;
  crp: string;
  cellphone: string;
  approach: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
}

const create = useCallback(
  async (name: string, email: string, password: string) => {
    await api.post('/auth/signup', { name, email, password }).then(res => {
      console.log(res);
    });
  },
  []
);
