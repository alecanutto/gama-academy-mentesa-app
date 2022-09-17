import { useEffect, useState } from 'react';
import { api } from '../services/api/axios-config';

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await api
        .get(url)
        .then(response => setData(response.data))
        .finally(() => setLoading(false));
    };
    getData();
  }, []);

  return { data, isLoading };
}
