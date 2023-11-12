import { useEffect, useState } from 'react';
import { request } from '../utils/request';

export const usePost = (url) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState('unchanged');
  const [error, setError] = useState('unchanged');

  const postFn = async (data) => {
    try {
      setLoading(true);
      const res = await request.post(url, data);
      const result = res.data;
      setResponse(result);
    } catch (err) {
      const er = err;
      setError(er);
    } finally {
      setLoading(false);
    }
  };

  return { postFn, isLoading, response, error };
};
