import { IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import { IPatientList } from 'types/reduxTypes/patient-emr';

import { IAxiosResponse, RequestManagerType } from './axios';
import { Axios } from './axiosInstance';
import { IAlertDetailsResponse, IPatientsFiltersResponse } from './managerPatientEmr';

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
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>(`${baseURL}/v1/patient/search/filters`);
  }
};

export default patientEmrManager;
