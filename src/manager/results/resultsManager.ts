import {
  IAddMachineForSpecimen,
  IAddSpecimenToTransportFolder,
  IAllTestsSpecimensReqBody,
  IMakeTestResultReleased,
  IMakeTestResultReviewed,
  IMarkInTransitActionReqBody,
  IOrderResultsListReqBody,
  IOrdersFilters,
  IOrdersStatuses,
  IResultsReqBody,
  ISpecimenCollectionData,
  ISpecimenLocations,
  ISpecimensForAppointment,
  ISpecimensListReqBody,
  ISpecimensReqBody,
  ITestResultsData,
  ITestResultsDetailsBody,
  ITransportListReqBody,
  IValidateOrderCreationReqBody,
  IValidateOrderCreationResponse,
  OrdersListDataProps
} from '@axios/results/resultsManagerTypes';
import { AxiosResponse } from 'axios';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IGetOrderDetailsResponse,
  IOrderResultsByPatientList,
  IOrdersListResponse,
  IOrderTypesGroups,
  IUpdateOrderReqBody
} from 'types/reduxTypes/ordersStateTypes';
import {
  CancellationReasons,
  IAllTestsSpecimensList,
  IObjectWithId,
  IPendingSpecimensStats,
  IPendingTestResultStats,
  IResultsList,
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
  IOrderResultsFiltersResponse,
  IOrderResultsStatusesResponse,
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
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<SpecimenActionsList>>(`${baseURL}/v1/specimen/status`);
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

  getOrderResultsListForPatient(data: IOrderResultsListReqBody, patientId: string) {
    return axiosInstance.post<IOrderResultsByPatientList, IAxiosResponsePaginated<IOrderResultsByPatientList>>(
      `${baseURL}/v1/test-result`,
      data,
      { params: { patientId } }
    );
  },
  addMachineForSpecimen(specimenIds: ISpecimensReqBody[], machineId: string) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/specimen/add-machine`,
      {
        specimens: specimenIds,
        machineId
      }
    );
  },
  markInTransitAction(reqBody: IMarkInTransitActionReqBody) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/transport/in-transit`,
      {
        ...reqBody
      }
    );
  },
  downloadTransportFolderManifest(transportFolderId: string) {
    return axiosInstance.get<void, AxiosResponse<BlobPart>>(
      `/clinic-downloads/v1/transport/${transportFolderId}/download-manifest`,
      {
        responseType: 'blob'
      }
    );
  },
  applyRetestAction(specimenData: IObjectWithId[], reasonId: string) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/specimen/retest`,
      {
        specimens: specimenData,
        reasonId
      }
    );
  },
  applyRecollectAction(specimenData: IObjectWithId[], reasonId: string) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/specimen/recollect`,
      {
        specimens: specimenData,
        reasonId
      }
    );
  },
  applyMoveToInHouse(specimens: IObjectWithId[]) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/specimen/move-in-house`,
      { specimens }
    );
  },
  applyMoveToAllTests(specimens: IObjectWithId[]) {
    return axiosInstance.patch<IAddMachineForSpecimen, IAxiosResponse<IAddMachineForSpecimen>>(
      `${baseURL}/v1/specimen/mark-as-collected`,
      { specimens }
    );
  },
  getSpecimensFilters() {
    return axiosInstance.get<ISpecimensFiltersResponse, IAxiosResponse<ISpecimensFiltersResponse>>(
      `${baseURL}/v1/specimen/filter`
    );
  },
  getOrderResultsFilters() {
    return axiosInstance.get<IOrderResultsFiltersResponse, IAxiosResponse<IOrderResultsFiltersResponse>>(
      `${baseURL}/v1/test-result/filter/emr`
    );
  },
  getOrderResultsStatuses() {
    return axiosInstance.get<IOrderResultsStatusesResponse, IAxiosResponse<IOrderResultsStatusesResponse>>(
      `${baseURL}/v1/test-result/status`
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
      `${baseURL}/v1/transport/status`
    );
  },
  getCancellationReasons() {
    return axiosInstance.get<ITestResultsDetails, IAxiosResponse<CancellationReasons>>(
      `${baseURL}/v1/order/cancellation-reason`
    );
  },
  cancelOrder(orderId: string, reasonId: string, cancellationReason?: string) {
    return axiosInstance.patch<ITestResultsDetails, IAxiosResponse<CancellationReasons>>(
      `${baseURL}/v1/order/${orderId}/cancel`,
      {
        reasonId,
        cancellationReason
      }
    );
  },
  getAllTestsSpecimensList(data: IAllTestsSpecimensReqBody) {
    return axiosInstance.post<IAllTestsSpecimensList, IAxiosResponsePaginated<IAllTestsSpecimensList>>(
      `${baseURL}/v1/specimen/collected`,
      data
    );
  },
  getSpecimensForAppointment(appointmentId: string) {
    return axiosInstance.get<ISpecimensForAppointment, IAxiosResponse<ISpecimensForAppointment>>(
      `${baseURL}/v1/specimen/appointment/${appointmentId}`
    );
  },
  getSpecimenStorageLocations() {
    return axiosInstance.get<ISpecimenLocations, IAxiosResponse<ISpecimenLocations>>(
      `${baseURL}/v1/specimen-storage-location`
    );
  },
  submitSpecimenCollections(data: ISpecimenCollectionData) {
    return axiosInstance.patch<ISpecimenCollectionData, IAxiosResponse<ISpecimenCollectionData>>(
      `${baseURL}/v1/specimen/collect`,
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
  addSpecimenToTransportFolder(specimens: IObjectWithId[], transportFolderId: string) {
    return axiosInstance.patch<IAddSpecimenToTransportFolder, IAxiosResponse<IAddSpecimenToTransportFolder>>(
      `${baseURL}/v1/specimen/add-to-transport`,
      {
        specimens,
        transportFolderId
      }
    );
  },
  downloadRequisition(orderId: string) {
    return axiosInstance.get<void, IAxiosResponse<void>>(`${baseURL}/v1/order/${orderId}/download-requisition`);
  },
  getOrdersFilters() {
    return axiosInstance.get<IOrdersFilters, IAxiosResponse<IOrdersFilters>>(`${baseURL}/v1/order/filters`);
  },
  getOrdersStatuses() {
    return axiosInstance.get<IOrdersStatuses, IAxiosResponse<IOrdersStatuses>>(`${baseURL}/v1/order/status`);
  },
  getOrdersList(ordersListData: OrdersListDataProps) {
    return axiosInstance.post<IOrdersListResponse, IAxiosResponsePaginated<IOrdersListResponse>>(
      `${baseURL}/v1/order/list`,
      ordersListData
    );
  },
  getOrderTypes() {
    return axiosInstance.get<IOrderTypesGroups, IAxiosResponse<IOrderTypesGroups>>(`${baseURL}/v1/order/group`);
  },
  downloadTestResultAttachment(attachmentId: string) {
    return axiosInstance.get<Blob, IAxiosResponse<Blob>>(`${baseURL}/v1/test-result/attachment/${attachmentId}`);
  },
  getOrderDetails(orderId: string) {
    return axiosInstance
      .get<IGetOrderDetailsResponse, IAxiosResponse<IGetOrderDetailsResponse>>(`${baseURL}/v1/order/${orderId}`)
      .then(({ data }) => data);
  },
  updateOrder(orderId: string, body: IUpdateOrderReqBody) {
    return axiosInstance.put<null, IAxiosResponse<null>>(`${baseURL}/v1/order/${orderId}`, body);
  },
  validateOrderCreation(body: IValidateOrderCreationReqBody) {
    return axiosInstance
      .post<IValidateOrderCreationResponse, IAxiosResponse<IValidateOrderCreationResponse>>(
        `${baseURL}/v1/order/validate`,
        body
      )
      .then(({ data }) => data);
  }
};

export default resultsManager;
