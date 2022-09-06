import { IPatientsReqBody } from 'types/patient';

import { IPatientList } from '../types/reduxTypes/patients';

import { IAxiosResponse } from './axios';
import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_PATIENT_EMR_SERVICE_URL;

const axiosInstance = Axios({ baseURL });

const patientEmrManager = {
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<any, IAxiosResponse<IPatientList>>('/v1/patients/search', data);
  }
};

export default patientEmrManager;
