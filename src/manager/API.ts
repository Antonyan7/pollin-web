import bookingManager from '@axios/bookingManager';
import patientEmrManager from '@axios/patientEmrManager';

import { ApiType } from './axios';
import schedulingManager from './schedulingManager';

const API: ApiType = {
  scheduling: schedulingManager,
  booking: bookingManager,
  patients: patientEmrManager
};

export default API;

export const updateManagersBaseUrls = (baseURL: string) => {
  Object.keys(API).forEach((key) => {
    API[key].axiosInstance.defaults.baseURL = baseURL;
  });
};
