import { IAxiosResponse, IAxiosResponsePaginated } from '@axios/axios';
import {
  IAppointmentDetailsResponse,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICreatedAppointmentBody,
  ICreatedAppointmentResponse,
  IEditAppointmentBody,
  IPatientNamesResponseData,
  IServiceProvidersListResponse,
  IUpdatedAppointmentResponse
} from '@axios/managerBooking';

import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL;

const axiosInstance = Axios({ baseURL });
const bookingManager = {
  getAppointments(params: IAppointmentListReqParams) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentListResponse>>('/v1/calendar/slot', { params });
  },
  getServiceProviders() {
    return axiosInstance.get<any, IAxiosResponsePaginated<IServiceProvidersListResponse>>('/v1/provider');
  },
  getPatientNames(name: string) {
    return axiosInstance.post<any, IAxiosResponsePaginated<IPatientNamesResponseData>>(`/v1/patient`, { name });
  },
  getServiceTypes() {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentTypesData>>(`/v1/service-type`);
  },
  createAppointment(appointmentValues: ICreatedAppointmentBody) {
    return axiosInstance.post<any, IAxiosResponse<ICreatedAppointmentResponse>>(`/v1/appointment`, {
      ...appointmentValues
    });
  },
  getAppointmentDetails(appointmentId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentDetailsResponse>>(`/v1/appointment`, {
      params: { appointmentId }
    });
  },
  editAppointment(appointmentId: string, appointmentValues: IEditAppointmentBody) {
    return axiosInstance.put<any, IAxiosResponse<IUpdatedAppointmentResponse>>(
      `/v1/appointment/${appointmentId}`,
      appointmentValues
    );
  }
};

export default bookingManager;
