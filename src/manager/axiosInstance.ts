import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CookieKey } from 'constants/cookieKey';
import { devToolsDefaultConfig } from 'constants/defaultConfigs';
import { guid } from 'helpers/guid';

import { getFromCookie } from '@utils/cookies';

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

const getServerUrl = () => {
  const devConfig = getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig);

  return devConfig?.server;
};

class RequestManager {
  private static instance: AxiosInstance;

  static getCreateInstance(): AxiosInstance {
    if (RequestManager.instance) {
      return RequestManager.instance;
    }

    const serverUrl = getServerUrl();
    const axiosInstance = axios.create({ baseURL: `${serverUrl}` });

    axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const requestConfig = config;

      const captchaToken = await FirebaseManager?.getToken();
      const idToken = await FirebaseManager?.getIdToken();

      requestConfig.headers = {
        'x-pollin-device-id': getOrGenerateDeviceId(),
        'x-pollin-request-id': generateRequestId(),
        'x-pollin-lang': 'en',
        'x-pollin-source': 'web',
        'x-pollin-firebase-app-check': captchaToken,
        'x-pollin-app-version': `${process.env.NEXT_PUBLIC_APP_VERSION}`,
        'x-pollin-id-token': idToken
      };

      return requestConfig;
    });

    RequestManager.instance = axiosInstance;

    return axiosInstance;
  }
}

export const Axios = () => RequestManager.getCreateInstance();
