import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse } from 'manager/axiosTypes';
import { ITestResultLatest } from 'types/reduxTypes/testResults';

const baseURL = '/clinic-test-results';

const axiosInstance = Axios();

const patientTestResultManager = {
  axiosInstance,
  getProfileTestResultLatest(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<ITestResultLatest[]>>(
      `${baseURL}/v1/profile-test-result/${patientId}/latest`
    );
  }
};

export default patientTestResultManager;
