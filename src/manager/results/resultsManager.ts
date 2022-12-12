import {
  IAddMachineforSpecimen,
  IAddSpecimenToTransportFolder,
  IAllTestsSpecimensReqBody,
  IMakeTestResultReleased,
  IMakeTestResultReviewed,
  IMarkInTransitActionReqBody,
  IResultsReqBody,
  ISpecimensListReqBody,
  ITestResultsData,
  ITestResultsDetailsBody,
  ITransportListReqBody
} from '@axios/results/resultsManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IAllTestsSpecimensList,
  IPendingSpecimensStats,
  IPendingTestResultStats,
  IResultsList,
  IRetestRecollectData,
  ISpecimensInTransportList,
  ISpecimensList,
  ITestResultsDetails,
  ITransportListProps,
  LabMachine,
  SpecimenActionsList
} from 'types/reduxTypes/resultsStateTypes';
import {
  ICreateTransportFolderReqBody,
  ICreateTransportFolderResponse,
  IGetSpecimensInTransportListParams,
  IGetTransportFoldersReqBody,
  IGetTransportFoldersResponse,
  ILabsResponse,
  IResultsFiltersResponse,
  ISpecimensFiltersResponse
} from 'types/results';

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
  makeTestResultReviewed(testResultId: string, reviewerComment?: string) {
    return axiosInstance.patch<IMakeTestResultReviewed, IAxiosResponse<IMakeTestResultReviewed>>(
      `${baseURL}/v1/test-result/review`,
      {
        testResultId,
        reviewerComment
      }
    );
  },
  makeTestResultReleased(testResultId: string) {
    return axiosInstance.patch<IMakeTestResultReleased, IAxiosResponse<IMakeTestResultReleased>>(
      `${baseURL}/v1/test-result/release`,
      {
        testResultId
      }
    );
  },
  removeTestResultsAttachment(attachmentId: string) {
    return axiosInstance.delete<void, IAxiosResponse<void>>(`${baseURL}/v1/test-result/attachment/${attachmentId}`);
  },
  getLabMachines() {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<LabMachine>>(`${baseURL}/v1/lab-machines`);
  },
  getRetestRecollect(action: string) {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<LabMachine>>(
      `${baseURL}/v1/specimen/incompletion-reasons`,
      {
        params: {
          action
        }
      }
    );
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
  markInTransitAction(reqBody: IMarkInTransitActionReqBody) {
    return axiosInstance.patch<IAddMachineforSpecimen, IAxiosResponse<IAddMachineforSpecimen>>(
      `${baseURL}/v1/transport/in-transit`,
      {
        ...reqBody
      }
    );
  },
  applyRetestAction(specimenData: IRetestRecollectData[], reasonId: string) {
    return axiosInstance.patch<IAddMachineforSpecimen, IAxiosResponse<IAddMachineforSpecimen>>(
      `${baseURL}/v1/specimen/retest`,
      {
        specimens: specimenData,
        reasonId
      }
    );
  },
  applyRecollectAction(specimenData: IRetestRecollectData[], reasonId: string) {
    return axiosInstance.patch<IAddMachineforSpecimen, IAxiosResponse<IAddMachineforSpecimen>>(
      `${baseURL}/v1/specimen/recollect`,
      {
        specimens: specimenData,
        reasonId
      }
    );
  },
  getSpecimensFilters() {
    return axiosInstance.get<ISpecimensFiltersResponse, IAxiosResponse<ISpecimensFiltersResponse>>(
      `${baseURL}/v1/specimen/filter`
    );
  },
  getTransportList(data: ITransportListReqBody) {
    return axiosInstance.post<ITransportListProps, IAxiosResponsePaginated<ITransportListProps>>(
      `${baseURL}/v1/transport/list`,
      data
    );
  },
  getTransportActions() {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<SpecimenActionsList>>(
      `${baseURL}/v1/transport/actions`
    );
  },
  getAllTestsSpecimensList(data: IAllTestsSpecimensReqBody) {
    return axiosInstance.post<IAllTestsSpecimensList, IAxiosResponsePaginated<IAllTestsSpecimensList>>(
      `${baseURL}/v1/specimen/collected`,
      data
    );
  },
  getLabs() {
    return axiosInstance.get<ILabsResponse, IAxiosResponse<ILabsResponse>>(`${baseURL}/v1/labs`);
  },
  createTransportFolder(data: ICreateTransportFolderReqBody) {
    return axiosInstance.post<ICreateTransportFolderResponse, IAxiosResponsePaginated<ICreateTransportFolderResponse>>(
      `${baseURL}/v1/transport`,
      data
    );
  },
  getSpecimensInTransport(params: IGetSpecimensInTransportListParams, transportId: string) {
    return axiosInstance.get<ISpecimensInTransportList, IAxiosResponsePaginated<ISpecimensInTransportList>>(
      `${baseURL}/v1/specimen/in-transport/${transportId}`,
      {
        params
      }
    );
  },

  getTransportFolders(data: IGetTransportFoldersReqBody) {
    return axiosInstance.post<IGetTransportFoldersResponse, IAxiosResponsePaginated<IGetTransportFoldersResponse>>(
      `${baseURL}/v1/transport/list`,
      data
    );
  },
  addSpecimenToTransportFolder(specimens: IRetestRecollectData[], transportFolderId: string) {
    return axiosInstance.patch<IAddSpecimenToTransportFolder, IAxiosResponse<IAddSpecimenToTransportFolder>>(
      `${baseURL}/v1/specimen/add-to-transport`,
      {
        specimens,
        transportFolderId
      }
    );
  }
};

export default resultsManager;
