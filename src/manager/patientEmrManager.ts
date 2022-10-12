import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import { IEncounterDetailsResponse, IPatientsResponse } from 'types/reduxTypes/patient-emr';

import { IAxiosResponse, IAxiosResponsePaginated } from './axios';
import { Axios } from './axiosInstance';
import {
  IAlertDetailsResponse,
  ICreateEncounterAddendumRequest,
  ICreateEncounterNoteRequest,
  IEncounterFilterResponse,
  IEncounterResponse,
  IEncounterTypesResponse,
  IGetPatientsRequestBody,
  IPatientEncountersListResponse,
  IPatientHighlightDetailsResponse,
  IPatientHighlightResponse,
  IPatientProfileResponse,
  IPatientsFiltersResponse,
  IPatientsListResponse,
  IUpdateEncounterAddendumRequest,
  IUpdateEncounterNoteRequest
} from './managerPatientEmr';

const baseURL = '/clinic-patient-emr';

const axiosInstance = Axios();

const patientEmrManager = {
  axiosInstance,
  getPatientAlertDetails(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAlertDetailsResponse>>(`${baseURL}/v1/patients/alerts`, {
      params: { patientId }
    });
  },
  getPatients(data: IGetPatientsRequestBody) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IPatientsResponse>>(`${baseURL}/v1/patients`, data);
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
  getPatientProfile(patientId: string | string[]) {
    return axiosInstance.get<any, IAxiosResponse<IPatientProfileResponse>>(`${baseURL}/v1/profile/${patientId}`);
  },
  getPatientHighlight(patientId: string | string[]) {
    return axiosInstance.get<any, IAxiosResponse<IPatientHighlightResponse>>(
      `${baseURL}/v1/profile/${patientId}/highlight`
    );
  },
  getPatientHighlightDetails(patientId: string | string[], uuid: string) {
    return axiosInstance
      .get<any, IAxiosResponse<IPatientHighlightDetailsResponse>>(
        `${baseURL}/v1/profile/${patientId}/highlight/${uuid}`
      )
      .then(({ data }) => data);
  }
};

export default patientEmrManager;
