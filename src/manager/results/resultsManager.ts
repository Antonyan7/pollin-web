import { IResultsReqBody } from '@axios/results/resultsManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import { IPendingTestStats, IResultsList, ITestResultsDetails } from 'types/reduxTypes/resultsStateTypes';
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
    return axiosInstance.get<IPendingTestStats[], IAxiosResponse<IPendingTestStats[]>>(
      `${baseURL}/v1/test-result/stats/pending`
    );
  },
  getTestResultsDetails(testResultId: string) {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<ITestResultsDetails>>(
      `${baseURL}/v1/test-result/${testResultId}`
    );
  }
};

export default resultsManager;
