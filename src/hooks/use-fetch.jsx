import { useState, useEffect } from 'react';
import { request } from '../utils/request';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await request.get(url, { ...options, signal });
        setResponse(res);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      abort();
    };
  }, []);

  return { response, error, abort };
};
