import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import { IPatientList } from 'types/reduxTypes/patient-emr';

import { IAxiosResponse, RequestManagerType } from './axios';
import { Axios } from './axiosInstance';
import {
  IAlertDetailsResponse,
  ICreateEncounterNoteRequest,
  ICreateEncounterNoteResponse,
  IPatientsFiltersResponse,
  IUpdateEncounterNoteRequest,
  IUpdateEncounterNoteResponse
} from './managerPatientEmr';

const baseURL = '/clinic-patient-emr';

const axiosInstance = Axios();

const patientEmrManager: RequestManagerType = {
  axiosInstance,
  getPatientAlertDetails(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAlertDetailsResponse>>(`${baseURL}/v1/patients/alerts`, {
      params: { patientId }
    });
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<any, IAxiosResponse<IPatientList>>(`${baseURL}/v1/patient/search`, data);
  },
  getEncounterList(data: IEncountersReqBody) {
    return axiosInstance.post<any, IAxiosResponse<IPatientList>>(`${baseURL}/v1/encounters/list`, data);
  },
  getPatientSearchFilters() {
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>(`${baseURL}/v1/patients/search/filters`);
  },
  createEncounterNote(data: ICreateEncounterNoteRequest) {
    return axiosInstance.post<any, IAxiosResponse<ICreateEncounterNoteResponse>>(`${baseURL}/v1/encounter`, data);
  },
  updateEncounterNote(data: IUpdateEncounterNoteRequest) {
    return axiosInstance.put<any, IAxiosResponse<IUpdateEncounterNoteResponse>>(`${baseURL}/v1/encounter`, data);
  }
};

export default patientEmrManager;
