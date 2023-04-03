import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isDate } from 'date-fns';

import { DateAcceptableType, DateUtil } from '@utils/date/DateUtil';
import collectionDeepDateConvert from '@utils/deepConvertDate';
import { errorLog, greenLog, greyLog } from '@utils/logger';

import { CypressIds } from '../constants/cypressIds';
import { ModalName } from '../types/modals';

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
    args.push({ body: JSON.parse(response.config.data) });
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

export const handleErrorActions = (error: { response: AxiosResponse }): void => {
  switch (error?.response?.status) {
    case 403:
      dispatch(
        viewsMiddleware.setRedirectionState({
          path: '/access-denied',
          params: '',
          apply: true
        })
      );
      break;
    case 400:
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: error?.response?.data?.status?.message ?? error.response.data.data.message,
            dataCy: CypressIds.COMMON_TOAST_ERROR_MESSAGE
          }
        })
      );
      break;
    default:
      dispatch(viewsMiddleware.openModal({ name: ModalName.ErrorModal, props: null }));
  }
};
