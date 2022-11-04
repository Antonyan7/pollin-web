import * as Sentry from '@sentry/nextjs';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IAlertDetailsResponse,
  ICreateEncounterAddendumRequest,
  ICreateEncounterNoteRequest,
  IEncounterFilterResponse,
  IEncounterResponse,
  IEncounterTypesResponse,
  IGetPatientsRequestBody,
  IGetPatientsResponse,
  IPatientEncountersListResponse,
  IPatientHighlightDetailsResponse,
  IPatientHighlightResponse,
  IPatientProfileOverviewResponse,
  IPatientProfileResponse,
  IPatientsFiltersResponse,
  IPatientsListResponse,
  IProfileTestResults,
  ITestResultHistoryResponse,
  IUpdateEncounterAddendumRequest,
  IUpdateEncounterNoteRequest
} from 'manager/patientEmr/managerPatientEmrTypes';
import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import { IEncounterDetailsResponse, ITestResultLatest } from 'types/reduxTypes/patient-emrStateTypes';

const baseURL = '/clinic-patient-emr';
const baseURLTestsResults = '/clinic-test-results';
const axiosInstance = Axios();

const patientEmrManager = {
  axiosInstance,
  getPatientAlertDetails(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAlertDetailsResponse>>(`${baseURL}/v1/patients/alerts`, {
      params: { patientId }
    });
  },
  getPatients(data: IGetPatientsRequestBody) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IGetPatientsResponse>>(`${baseURL}/v1/patients`, data);
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IPatientsListResponse>>(
      `${baseURL}/v1/patients/search`,
      data
    );
  },
  getEncounterList(data: IEncountersReqBody) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IPatientEncountersListResponse>>(
      `${baseURL}/v1/encounters/list`,
      data
    );
  },
  getEncounterTypes() {
    return axiosInstance.get<any, IAxiosResponse<IEncounterTypesResponse>>(`${baseURL}/v1/encounters/type`);
  },
  getEncounterDetails(encounterId: string) {
    return axiosInstance.get<any, IAxiosResponse<IEncounterDetailsResponse>>(`${baseURL}/v1/encounters/${encounterId}`);
  },
  getPatientSearchFilters() {
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>(`${baseURL}/v1/patients/search/filter`);
  },
  getEncounterFilters() {
    return axiosInstance.get<any, IAxiosResponse<IEncounterFilterResponse>>(`${baseURL}/v1/encounters/filters`);
  },
  getEncounter(encounterId: string) {
    return axiosInstance.get<any, IAxiosResponse<IEncounterResponse>>(`${baseURL}/v1/encounters/${encounterId}`);
  },
  createEncounterNote(data: ICreateEncounterNoteRequest) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters`, data);
  },
  updateEncounterNote(data: IUpdateEncounterNoteRequest) {
    return axiosInstance.put<any, IAxiosResponse<IEncounterDetailsResponse>>(`${baseURL}/v1/encounters`, data);
  },
  createEncounterAddendum(data: ICreateEncounterAddendumRequest) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters/addendum`, data);
  },
  updateEncounterAddendum(data: IUpdateEncounterAddendumRequest) {
    return axiosInstance.put<any, IAxiosResponse<IEncounterDetailsResponse>>(`${baseURL}/v1/encounters/addendum`, data);
  },
  getPatientProfile(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IPatientProfileResponse>>(`${baseURL}/v1/profile/${patientId}`);
  },
  getPatientHighlights(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IPatientHighlightResponse>>(
      `${baseURL}/v1/profile/${patientId}/highlight`
    );
  },
  getPatientHighlightDetails(patientId: string, uiid: string) {
    return axiosInstance
      .get<any, IAxiosResponse<IPatientHighlightDetailsResponse>>(
        `${baseURL}/v1/profile/${patientId}/highlight/${uiid}`
      )
      .then(
        ({ data }) => data.data,
        (error) => {
          Sentry.captureException(error);

          return null;
        }
      );
  },
  getPatientProfileOverview(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IPatientProfileOverviewResponse>>(
      `${baseURL}/v1/profile/${patientId}/overview`
    );
  },
  getProfileTestResults(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IProfileTestResults>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}`
    );
  },
  getProfileTestResultLatest(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<ITestResultLatest[]>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/latest`
    );
  },
  getProfileTestResultsHistory(patientId: string, testTypeId: string) {
    return axiosInstance.get<any, IAxiosResponse<ITestResultHistoryResponse>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/testType/${testTypeId}/history`
    );
  }
};

export default patientEmrManager;
