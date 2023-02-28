import { RecordedHealthType } from '@components/MedicalBackground/helpers';
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
  IGeneralHealth,
  IGetPatientsRequestBody,
  IGetPatientsResponse,
  IPatientContactInformationResponse,
  IPatientEncountersListResponse,
  IPatientHighlightDetailsResponse,
  IPatientHighlightResponse,
  IPatientProfileOverviewResponse,
  IPatientProfileResponse,
  IPatientsFiltersResponse,
  IPatientsListResponse,
  IProfileTestResultDetailsReqBody,
  IProfileTestResultDetailsResponse,
  IProfileTestResults,
  ITestResultHistoryResponse,
  IUpdateEncounterAddendumRequest,
  IUpdateEncounterNoteRequest
} from 'manager/patientEmr/managerPatientEmrTypes';
import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import { IEncounterDetailsResponse, ILatestTestResult } from 'types/reduxTypes/patient-emrStateTypes';

const baseURL = '/clinic-patient-emr';
const baseURLTestsResults = '/clinic-test-results';
const axiosInstance = Axios();

const patientEmrManager = {
  axiosInstance,
  getPatientAlertDetails(patientId: string, signal?: AbortSignal) {
    return axiosInstance.get<IAlertDetailsResponse, IAxiosResponse<IAlertDetailsResponse>>(
      `${baseURL}/v1/patients/alerts`,
      {
        params: { patientId },
        signal
      }
    );
  },
  getPatients(data: IGetPatientsRequestBody) {
    return axiosInstance.post<IGetPatientsResponse, IAxiosResponsePaginated<IGetPatientsResponse>>(
      `${baseURL}/v1/patients`,
      data
    );
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<IPatientsListResponse, IAxiosResponsePaginated<IPatientsListResponse>>(
      `${baseURL}/v1/patients/search`,
      data
    );
  },
  getEncounterList(data: IEncountersReqBody) {
    return axiosInstance.post<IPatientEncountersListResponse, IAxiosResponsePaginated<IPatientEncountersListResponse>>(
      `${baseURL}/v1/encounters/list`,
      data
    );
  },
  getEncounterTypes() {
    return axiosInstance.get<IEncounterTypesResponse, IAxiosResponse<IEncounterTypesResponse>>(
      `${baseURL}/v1/encounters/type`
    );
  },
  getEncounterDetails(encounterId: string) {
    return axiosInstance.get<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters/${encounterId}`
    );
  },
  getPatientSearchFilters() {
    return axiosInstance.get<IPatientsFiltersResponse, IAxiosResponse<IPatientsFiltersResponse>>(
      `${baseURL}/v1/patients/search/filter`
    );
  },
  getEncounterFilters() {
    return axiosInstance.get<IEncounterFilterResponse, IAxiosResponse<IEncounterFilterResponse>>(
      `${baseURL}/v1/encounters/filters`
    );
  },
  getEncounter(encounterId: string) {
    return axiosInstance.get<IEncounterResponse, IAxiosResponse<IEncounterResponse>>(
      `${baseURL}/v1/encounters/${encounterId}`
    );
  },
  createEncounterNote(data: ICreateEncounterNoteRequest) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/encounters`, data);
  },
  updateEncounterNote(data: IUpdateEncounterNoteRequest) {
    return axiosInstance.put<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters`,
      data
    );
  },
  createEncounterAddendum(data: ICreateEncounterAddendumRequest) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/encounters/addendum`, data);
  },
  updateEncounterAddendum(data: IUpdateEncounterAddendumRequest) {
    return axiosInstance.put<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters/addendum`,
      data
    );
  },
  getPatientProfile(patientId: string) {
    return axiosInstance.get<IPatientProfileResponse, IAxiosResponse<IPatientProfileResponse>>(
      `${baseURL}/v1/profile/${patientId}`
    );
  },
  getPatientHighlights(patientId: string) {
    return axiosInstance.get<IPatientHighlightResponse, IAxiosResponse<IPatientHighlightResponse>>(
      `${baseURL}/v1/profile/${patientId}/highlight`
    );
  },
  getPatientHighlightDetails(patientId: string, uiid: string) {
    return axiosInstance
      .get<IPatientHighlightDetailsResponse, IAxiosResponse<IPatientHighlightDetailsResponse>>(
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
    return axiosInstance.get<IPatientProfileOverviewResponse, IAxiosResponse<IPatientProfileOverviewResponse>>(
      `${baseURL}/v1/profile/${patientId}/overview`
    );
  },
  getProfileTestResults(patientId: string) {
    return axiosInstance.get<IProfileTestResults, IAxiosResponse<IProfileTestResults>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}`
    );
  },
  getProfileTestResultDetails(patientId: string, params: IProfileTestResultDetailsReqBody) {
    return axiosInstance.get<IProfileTestResultDetailsResponse, IAxiosResponse<IProfileTestResultDetailsResponse>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/details`,
      {
        params
      }
    );
  },
  getProfileTestResultLatest(patientId: string) {
    return axiosInstance.get<ILatestTestResult, IAxiosResponse<ILatestTestResult>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/latest`
    );
  },
  getProfileTestResultsHistory(patientId: string, testTypeId: string) {
    return axiosInstance.get<ITestResultHistoryResponse, IAxiosResponse<ITestResultHistoryResponse>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/testType/${testTypeId}/history`
    );
  },
  getContactInformation(patientId: string) {
    return axiosInstance.get<IPatientContactInformationResponse, IAxiosResponse<IPatientContactInformationResponse>>(
      `${baseURL}/v1/profile/${patientId}/confirmation`
    );
  },
  sendIntakeReminder(patientId: string) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/notification/send-intake-reminder`, {
      patientId
    });
  },
  // medical background
  getGeneralHealth(patientId: string) {
    return axiosInstance.get<IGeneralHealth, IAxiosResponse<IGeneralHealth>>(
      `${baseURL}/v1/medical-background/${patientId}/general-health`
    );
  },
  updateGeneralHealth(patientId: string, generalHealthData: RecordedHealthType) {
    return axiosInstance.put<IGeneralHealth, IAxiosResponse<IGeneralHealth>>(
      `${baseURL}/v1/medical-background/${patientId}/general-health`,
      generalHealthData
    );
  }
};

export default patientEmrManager;
