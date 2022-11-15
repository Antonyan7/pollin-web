import { IResultsReqBody, ITestResultsDetailsBody, ITestResultsParams } from '@axios/results/resultsManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IPendingTestResultStats,
  IResultsList,
  ITestResultsDetails,
  LabMachine
} from 'types/reduxTypes/resultsStateTypes';
import { IResultsFiltersResponse } from 'types/results';

const baseURL = '/clinic-test-results';

const axiosInstance = Axios();

const resultsManager = {
  axiosInstance,
  getResults(data: IResultsReqBody) {
    return axiosInstance.post<IResultsList, IAxiosResponsePaginated<IResultsList>>(
      `${baseURL}/v1/test-result/pending`,
      data
    );
  },
  getResultsFilters() {
    return axiosInstance.get<IResultsFiltersResponse, IAxiosResponse<IResultsFiltersResponse>>(
      `${baseURL}/v1/test-result/filter/pending`
    );
  },
  getPendingTestStats() {
    return axiosInstance.get<IPendingTestResultStats, IAxiosResponse<IPendingTestResultStats>>(
      `${baseURL}/v1/test-result/stats/pending`
    );
  },
  getTestResultsDetails(params: ITestResultsParams) {
    return axiosInstance.get<ITestResultsDetailsBody, IAxiosResponse<ITestResultsDetailsBody>>(
      `${baseURL}/v1/test-result`,
      {
        params
      }
    );
  },
  removeTestResultsAttachment(attachmentId: string) {
    return axiosInstance.delete<void, IAxiosResponse<void>>(`${baseURL}/v1/test-result/attachment/${attachmentId}`);
  },
  getLabMachines() {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<LabMachine[]>>(`${baseURL}/v1/lab-machines`);
  },
  getPendingSpecimenStats() {
    return axiosInstance.get<IPendingTestResultStats, IAxiosResponse<IPendingTestResultStats>>(
      // Url to be changed
      `${baseURL}/v1/test-result/stats/pending`
    );
  }
};

export default resultsManager;
