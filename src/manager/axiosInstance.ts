import axios, { AxiosRequestConfig } from 'axios';
import { guid } from 'helpers/guid';

const generateRequestId = () => guid();
const getOrGenerateDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');

  if (deviceId) {
    return deviceId;
  }

  const newDeviceId = guid();

  localStorage.setItem('deviceId', newDeviceId);

  return newDeviceId;
};

const Axios = (parameters: { token?: string; baseURL?: string }) => {
  const { baseURL } = parameters;
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const requestConfig = config;

    requestConfig.headers = {
      'x-pollin-device-id': getOrGenerateDeviceId(),
      'x-pollin-request-id': generateRequestId(),
      'x-pollin-lang': 'en',
      'x-pollin-source': 'web',
      'x-pollin-firebase-app-check': 'web',
      'x-pollin-app-version': '1.0.0',
      'x-pollin-id-token': 'web'
    };

    return requestConfig;
  });

  return axiosInstance;
};

export default Axios;
