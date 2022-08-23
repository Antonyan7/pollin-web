import { IAxiosResponse } from '@axios/axios';
import {
  IAppointmentDetailsData,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICreatedAppointmentData,
  IPatientNamesResponseData,
  IServiceProvidersListResponse,
  IUpdatedAppointmentData
} from '@axios/managerBooking';
import { AppointmentDetailsProps, CreateAppointmentProps } from 'types/reduxTypes/appointments';

import { toIsoString } from '@utils/dateUtils';

import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL;

const axiosInstance = Axios({ baseURL });
const bookingManager = {
  getAppointments(params: IAppointmentListReqParams) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentListResponse>>('/v1/calendar/slot', { params });
  },
  getServiceProviders() {
    return axiosInstance.get<any, IAxiosResponse<IServiceProvidersListResponse>>('/v1/provider');
  },
  getPatientNames(name: string = 'exPatientName') {
    return axiosInstance.get<any, IAxiosResponse<IPatientNamesResponseData>>(`/v1/patient`, { params: { name } });
  },
  getServiceTypes() {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentTypesData>>(`/v1/service-type`);
  },
  makeAppointment(appointmentValues: CreateAppointmentProps) {
    return axiosInstance.post<any, IAxiosResponse<ICreatedAppointmentData>>(`/v1/appointment`, {
      appointmentTypeId: 'exAppointmentTypeId',
      patientId: 'exPatientId1',
      description: 'Appointment for checkup',
      date: toIsoString(appointmentValues.date as Date)
    });
  },
  takeAppointmentDetails(appointmentId: string = 'exAppointmentId') {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentDetailsData>>(`/v1/appointment`, {
      params: { appointmentId }
    });
  },
  reformAppointmentValues(appointmentValues: AppointmentDetailsProps) {
    return axiosInstance.put<any, IAxiosResponse<IUpdatedAppointmentData>>(`/v1/appointment`, {
      appointment: appointmentValues
    });
  }
};

export default bookingManager;
