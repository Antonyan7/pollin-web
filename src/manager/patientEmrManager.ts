import { IPatientsReqBody } from 'types/patient';

import { IAxiosResponse } from './axios';
import Axios from './axiosInstance';
import { IAlertDetailsResponse, IPatientList, IPatientsFiltersResponse } from './managerPatientEmr';

const baseURL = process.env.NEXT_PUBLIC_PATIENT_EMR_SERVICE_URL;

const axiosInstance = Axios({ baseURL });

const patientEmrManager = {
  getPatientAlertDetails(patientId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAlertDetailsResponse>>('/v1/patients/alerts', {
      params: { patientId }
    });
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<any, IAxiosResponse<IPatientList>>('/v1/patients/search', data);
  },
  getPatientSearchFilters() {
    return axiosInstance.get<any, IAxiosResponse<IPatientsFiltersResponse>>('/v1/patients/search/filters');
  }
};

export default patientEmrManager;
