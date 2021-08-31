import axios from "axios";

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const {response} = err;
    const {status} = response;

    if (status === 400) {
      return response;
    }

    if (status === 401) {
      return response;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
