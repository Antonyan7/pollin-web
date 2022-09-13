import { IPatientsReqBody } from 'types/patient';
import { IPatientList } from 'types/reduxTypes/patient-emr';

import { IAxiosResponse } from './axios';
import { Axios } from './axiosInstance';
import { IAlertDetailsResponse, IPatientsFiltersResponse } from './managerPatientEmr';

const baseURL = '/clinic-patient-emr/v1';

const axiosInstance = Axios();

const patientEmrManager = {
  getPatientAlertDetails(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAlertDetailsResponse>>(`${baseURL  }/patients/alerts`, {
      params: { patientId }
    });
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<any, IAxiosResponse<IPatientList>>(`${baseURL  }/patients/search`, data);
  },
  getPatientSearchFilters() {
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>(`${baseURL  }/patients/search/filters`);
  }
};

export default patientEmrManager;
