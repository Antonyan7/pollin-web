import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';

import { IAxiosResponse, IAxiosResponsePaginated } from './axios';
import { Axios } from './axiosInstance';
import {
  IAlertDetailsResponse,
  ICreateEncounterAddendumRequest,
  ICreateEncounterNoteRequest,
  IGetPatientsRequestBody,
  IGetPatientsResponse,
  IPatientEncountersListResponse,
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
  getPatientSearchFilters() {
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>(`${baseURL}/v1/patients/search/filter`);
  },
  createEncounterNote(data: ICreateEncounterNoteRequest) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters`, data);
  },
  updateEncounterNote(data: IUpdateEncounterNoteRequest) {
    return axiosInstance.put<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters`, data);
  },
  createEncounterAddendum(data: ICreateEncounterAddendumRequest) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters/addendum`, data);
  },
  updateEncounterAddendum(data: IUpdateEncounterAddendumRequest) {
    return axiosInstance.put<any, IAxiosResponse<void>>(`${baseURL}/v1/encounters/addendum`, data);
  }
};

export default patientEmrManager;
