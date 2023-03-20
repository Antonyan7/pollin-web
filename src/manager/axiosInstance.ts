import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { CookieKey } from 'constants/cookieKey';
import { devToolsDefaultConfig } from 'constants/defaultConfigs';
import { guid } from 'helpers/guid';

import { getFromCookie } from '@utils/cookies';
import { getEnvironmentVariables } from '@utils/getEnvironmentVariables';
import { errorLog } from '@utils/logger';

import { convertRequest, convertResponse, logError, logRequest, logResponse } from './axiosUtils';
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

    axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
      const requestConfig = config;

      try {
        const { LOGS_ENABLED, GLOBAL_DATE_CONVERTING_ENABLED } = FirebaseManager.getRemoteFlags();

        if (GLOBAL_DATE_CONVERTING_ENABLED) {
          convertRequest(requestConfig);
        }

        if (LOGS_ENABLED) {
          logRequest(requestConfig);
        }
      } catch (error) {
        errorLog('time converting error', error, requestConfig?.data);
      }

      const captchaToken = await FirebaseManager?.getToken();
      const idToken = await FirebaseManager?.getIdToken();
      const { NEXT_PUBLIC_APP_VERSION } = getEnvironmentVariables();

      requestConfig.headers.set({
        'x-pollin-device-id': getOrGenerateDeviceId(),
        'x-pollin-request-id': generateRequestId(),
        'x-pollin-lang': 'en',
        'x-pollin-source': 'web',
        'x-pollin-firebase-app-check': captchaToken,
        'x-pollin-app-version': `${NEXT_PUBLIC_APP_VERSION}`,
        'x-pollin-id-token': idToken
      });

      return requestConfig;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        const { LOGS_ENABLED, GLOBAL_DATE_CONVERTING_ENABLED } = FirebaseManager.getRemoteFlags();
        const convertedResponse = convertResponse(response);

        if (LOGS_ENABLED) {
          logResponse(response);
        }

        return GLOBAL_DATE_CONVERTING_ENABLED ? convertedResponse : response;
      },
      (error) => {
        const { LOGS_ENABLED } = FirebaseManager.getRemoteFlags();

        if (LOGS_ENABLED) {
          logError(error);
        }

        if (error.response.status === 403) {
          dispatch(
            viewsMiddleware.setRedirectionState({
              path: '/access-denied',
              params: '',
              apply: true
            })
          );
        }

        return Promise.reject(error);
      }
    );

    RequestManager.instance = axiosInstance;

    return axiosInstance;
  }
}

export const Axios = () => RequestManager.getCreateInstance();
