import { IAxiosResponse, IAxiosResponsePaginated } from '@axios/axiosTypes';
import {
  IAppointmentDetailsResponse,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICancelAppointmentReqBody,
  ICreatedAppointmentBody,
  ICreatedAppointmentResponse,
  IEditAppointmentBody,
  IGetPatientAppointmentsListReqBody,
  IGetPatientAppointmentsListResponse,
  IServiceProvidersListResponse,
  IServiceProvidersReqParams,
  IServiceTypesReqParams,
  IUpdatedAppointmentResponse
} from '@axios/booking/managerBookingTypes';
import { Axios } from 'manager/axiosInstance';

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
  getServiceTypes(params?: IServiceTypesReqParams) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentTypesData>>(`${baseURL}/v1/service-type`, {
      params
    });
  },
  createAppointment(appointmentValues: ICreatedAppointmentBody) {
    return axiosInstance.post<any, IAxiosResponse<ICreatedAppointmentResponse>>(`${baseURL}/v1/appointment`, {
      ...appointmentValues
    });
  },
  getAppointmentDetails(appointmentId: string) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentDetailsResponse>>(
      `${baseURL}/v1/appointment/${appointmentId}`
    );
  },
  editAppointment(appointmentId: string, appointmentValues: IEditAppointmentBody) {
    return axiosInstance.put<any, IAxiosResponse<IUpdatedAppointmentResponse>>(
      `${baseURL}/v1/appointment/${appointmentId}`,
      appointmentValues
    );
  },
  cancelAppointment(appointmentId: string, body: ICancelAppointmentReqBody) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/appointment/${appointmentId}/cancel`, body);
  },

  getAppointmentList(body: IGetPatientAppointmentsListReqBody) {
    return axiosInstance
      .post<any, IAxiosResponsePaginated<IGetPatientAppointmentsListResponse>>(`${baseURL}/v1/appointment/list`, body)
      .then(({ data }) => data);
  }
};

export default bookingManager;
