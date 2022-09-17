import { useCallback } from 'react';
import { api } from './axios-config';

export interface IPatient {
  id: number;
  name: string;
  cpf: string;
  email: string;
  gender: string;
  cellphone: string;
  birthDate: string;
  createdAt?: string;
  updatedAt?: string;
  professionalId: number;
}

const create = useCallback(
  async (name: string, email: string, password: string) => {
    await api.post('/auth/signup', { name, email, password }).then(res => {
      console.log(res);
    });
  },
  []
);
