import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAsyncApi = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchData = async (method, url, data = null) => {
    setIsLoading(true);
    try {
      let result;
      if (method === 'GET') {
        const res = await axios.get(url);
        setIsLoading(false);
        return res;
      } else if (method === 'POST') {
        const res = await axios.post(url, data);
        const result = res.data
        setIsLoading(false);
        return result;
      } else if (method === 'PATCH') {
        const res = await axios.patch(url, data);
        const result = res.data
        setIsLoading(false);
        return result;
      } else {
        throw new Error('Unsupported method');
      }
      setResponse(result.data);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const get = (url) => fetchData('GET', url);
  const post = (url, data) => fetchData('POST', url, data);
  const patch = (url, data) => fetchData('PATCH', url, data);

  return {
    response,
    isLoading,
    isError,
    get, // Function for GET requests
    post,
    patch
  };
};