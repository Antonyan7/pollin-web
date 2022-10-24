import bookingManager from '@axios/booking/bookingManager';
import patientEmrManager from '@axios/patientEmr/patientEmrManager';
import { AxiosInstance } from 'axios';
import schedulingManager from 'manager/scheduling/schedulingManager';

import coreManager from './core/coreManager';

const API = {
  core: coreManager,
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
