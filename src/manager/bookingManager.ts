import { IAxiosResponse, IAxiosResponsePaginated } from '@axios/axios';
import {
  IAppointmentDetailsResponse,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICancelAppointmentReqBody,
  ICreatedAppointmentBody,
  ICreatedAppointmentResponse,
  IEditAppointmentBody,
  IServiceProvidersListResponse,
  IServiceProvidersReqParams,
  IUpdatedAppointmentResponse
} from '@axios/managerBooking';

import { Axios } from './axiosInstance';

const baseURL = '/clinic-booking';

const axiosInstance = Axios();
const bookingManager = {
  axiosInstance,
  getAppointments(params: IAppointmentListReqParams) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentListResponse>>(`${baseURL}/v1/calendar/slot`, { params });
  },
  getServiceProviders(params: IServiceProvidersReqParams) {
    return axiosInstance.get<any, IAxiosResponsePaginated<IServiceProvidersListResponse>>(`${baseURL}/v1/provider`, {
      params
    });
  },
  getServiceTypes() {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentTypesData>>(`${baseURL}/v1/service-type`);
  },
  createAppointment(appointmentValues: ICreatedAppointmentBody) {
    return axiosInstance.post<any, IAxiosResponse<ICreatedAppointmentResponse>>(`${baseURL}/v1/appointment`, {
      ...appointmentValues
    });
  },
  getAppointmentDetails(appointmentId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentDetailsResponse>>(`${baseURL}/v1/appointment`, {
      params: { appointmentId }
    });
  },
  editAppointment(appointmentId: string, appointmentValues: IEditAppointmentBody) {
    return axiosInstance.put<any, IAxiosResponse<IUpdatedAppointmentResponse>>(
      `${baseURL}/v1/appointment/${appointmentId}`,
      appointmentValues
    );
  },
  cancelAppointment(appointmentId: string, body: ICancelAppointmentReqBody) {
    return axiosInstance.put<any, IAxiosResponse<void>>(`${baseURL}/v1/appointment/${appointmentId}/cancel`, body);
  }
};

export default bookingManager;
