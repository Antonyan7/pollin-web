import {
  IAddMachineforSpecimen,
  IResultsReqBody,
  ISpecimensListReqBody,
  ITestResultsData,
  ITestResultsDetailsBody
} from '@axios/results/resultsManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IPendingSpecimensStats,
  IPendingTestResultStats,
  IResultsList,
  ISpecimensList,
  ITestResultsDetails,
  LabMachine,
  SpecimenActionsList
} from 'types/reduxTypes/resultsStateTypes';
import { IResultsFiltersResponse, ISpecimensFiltersResponse } from 'types/results';

import { ITestResultsParams } from './resultsManagerTypes';

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
  submitTestResults(testResults: ITestResultsData[]) {
    return axiosInstance.put<ITestResultsData[], IAxiosResponse<ITestResultsData[]>>(`${baseURL}/v1/test-result`, {
      testResults
    });
  },
  getSpecimenActions() {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<SpecimenActionsList>>(
      `${baseURL}/v1/specimen/actions`
    );
  },
  getPendingSpecimenStats() {
    return axiosInstance.get<IPendingSpecimensStats, IAxiosResponse<IPendingSpecimensStats>>(
      `${baseURL}/v1/specimen/stats/pending`
    );
  },
  getSpecimens(data: ISpecimensListReqBody) {
    return axiosInstance.post<ISpecimensList, IAxiosResponsePaginated<ISpecimensList>>(
      `${baseURL}/v1/specimen/pending`,
      data
    );
  },
  addMachineforSpecimen(specimenIds: string[], machineId: string) {
    return axiosInstance.patch<IAddMachineforSpecimen, IAxiosResponse<IAddMachineforSpecimen>>(
      `${baseURL}/v1/specimen/add-machine`,
      {
        specimenIds,
        machineId
      }
    );
  },
  getSpecimensFilters() {
    return axiosInstance.get<ISpecimensFiltersResponse, IAxiosResponse<ISpecimensFiltersResponse>>(
      `${baseURL}/v1/specimen/filter`
    );
  }
};

export default resultsManager;
