import bookingManager from '@axios/bookingManager';
import patientEmrManager from '@axios/patientEmrManager';
import { AxiosInstance } from 'axios';

import schedulingManager from './schedulingManager';

const API = {
  scheduling: schedulingManager,
  booking: bookingManager,
  patients: patientEmrManager
};

export default API;

export const updateManagersBaseUrls = (baseURL: string) => {
  Object.keys(API).forEach((key) => {
    (API as IApi)[key].axiosInstance.defaults.baseURL = baseURL;
  });
};

interface IApi {
  [key: string]: IRequestManager;
}
interface IRequestManager {
  axiosInstance: AxiosInstance;
}
