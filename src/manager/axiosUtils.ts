import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isDate } from 'date-fns';

import { DateAcceptableType, DateUtil } from '@utils/date/DateUtil';
import collectionDeepDateConvert from '@utils/deepConvertDate';
import { errorLog, greenLog, greyLog } from '@utils/logger';

const requestTypeChecker = (value: DateAcceptableType): boolean => isDate(value) || typeof value === 'string';

const responseTypeChecker = (value: DateAcceptableType): boolean => typeof value === 'string';

// response is immutable so we are cloning it mutating and the freezing to keep it immutable
export const convertResponse = (response: AxiosResponse) => {
  const data = structuredClone(response.data);

  collectionDeepDateConvert(data, responseTypeChecker, (value: string) => DateUtil.convertFromClinic(value));

  const convertedResponse = {
    ...response,
    data
  };

  return Object.freeze(convertedResponse);
};

// requestConfig is not immutable so we are mutating itself
export const convertRequest = (requestConfig: AxiosRequestConfig) => {
  if (requestConfig.data) {
    collectionDeepDateConvert(requestConfig.data, requestTypeChecker, (value: string) =>
      DateUtil.convertFromLocal(value)
    );
  }

  if (requestConfig.params) {
    collectionDeepDateConvert(requestConfig.params, requestTypeChecker, (value: string) =>
      DateUtil.convertFromLocal(value)
    );
  }
};

export const logRequest = (request: AxiosRequestConfig): void => {
  const args: [string, Object?, Object?] = [`${request.method?.toUpperCase()}: ${request.url}`];

  if (request.data) {
    args.push({ body: request.data });
  }

  if (request.params) {
    args.push({ params: request.params });
  }

  greyLog(...args);
};

export const logResponse = (response: AxiosResponse): void => {
  const args: [string, Object?, Object?, Object?] = [
    `${response.config.method?.toUpperCase()}: ${response.config.url}`
  ];

  if (response.config.data) {
    args.push({ body: response.config.data });
  }

  if (response.config.params) {
    args.push({ params: response.config.params });
  }

  if (response.data) {
    args.push({ response: response.data });
  }

  greenLog(...args);
};

export const logError = (error: AxiosError): void => {
  const args: [string, Object?, Object?, Object?] = [`${error.config?.method?.toUpperCase()}: ${error.config?.url}`];

  if (error.config?.data) {
    args.push({ body: error.config?.data ? JSON.parse(error.config?.data) : null });
  }

  if (error.config?.params) {
    args.push({ params: error.config?.params });
  }

  if (error.response?.data) {
    args.push({ error: error.response?.data });
  }

  errorLog(...args);
};
