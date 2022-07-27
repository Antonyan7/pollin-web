import axios from 'axios';

const Axios = (parameters?: { token?: string; baseURL?: string }) => {
  const baseURL = parameters?.baseURL ?? '/';
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use((config) => {
    const requestConfig = config;

    // TODO: Configuration Needed
    // requestConfig.headers['opn-device-id']

    return requestConfig;
  });

  return axiosInstance;
};

export default Axios;
