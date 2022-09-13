import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { guid } from 'helpers/guid';

import { FirebaseManager } from './firebase';

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

class RequestManager {
  private static instance: AxiosInstance;

  static getCreateInstance(): AxiosInstance {
    if (RequestManager.instance) {
      return RequestManager.instance;
    }

    console.debug('Initiate data access level');

    const axiosInstance = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}` });

    FirebaseManager.initiate();
    axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const requestConfig = config;

      const captchaToken = await FirebaseManager.getToken();

      requestConfig.headers = {
        'x-pollin-device-id': getOrGenerateDeviceId(),
        'x-pollin-request-id': generateRequestId(),
        'x-pollin-lang': 'en',
        'x-pollin-source': 'web',
        'x-pollin-firebase-app-check': captchaToken,
        'x-pollin-app-version': `${process.env.NEXT_PUBLIC_APP_VERSION}`,
        'x-pollin-id-token': 'web'
      };

      return requestConfig;
    });

    RequestManager.instance = axiosInstance;

    return axiosInstance;
  }
}

export const Axios = () => RequestManager.getCreateInstance();
