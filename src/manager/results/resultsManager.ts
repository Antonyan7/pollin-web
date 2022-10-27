import { IResultsReqBody } from '@axios/results/resultsManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import { IResultsList } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFiltersResponse } from 'types/results';

const baseURL = '/clinic-test-results';

const axiosInstance = Axios();

const resultsManager = {
  axiosInstance,
  getResults(data: IResultsReqBody) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IResultsList>>(`${baseURL}/v1/test-result/pending`, data);
  },
  getResultsFilters() {
    return axiosInstance.get<any, IAxiosResponse<IResultsFiltersResponse>>(`${baseURL}/v1/test-result/filter/pending`);
  }
};

export default resultsManager;
