import { Axios } from '../axiosInstance';
import { IAxiosResponse } from '../axiosTypes';

import { IClinicConfigResponse } from './coreManagerTypes';

const baseURL = '/core';
const axiosInstance = Axios();

const coreManager = {
  axiosInstance,
  getClinicConfig() {
    return axiosInstance.get<any, IAxiosResponse<IClinicConfigResponse>>(`${baseURL}/v1/clinic-config`);
  }
};

export default coreManager;
