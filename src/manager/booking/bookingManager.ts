import { IAxiosResponse, IAxiosResponsePaginated } from '@axios/axiosTypes';
import {
  IAppointmentDetailsResponse,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICancelAppointmentReqBody,
  ICreateAppointmentBody,
  ICreatedAppointmentResponse,
  IEditAppointmentBody,
  IGetCollectionCalendarAppointmentFilters,
  IGetPatientAppointments,
  IGetPatientAppointmentsListFiltersResponse,
  IGetPatientAppointmentsListReqBody,
  IGetPatientAppointmentsListResponse,
  IGetPatientRecentAppointments,
  IGetProvidersCollectionCalendarAppointments,
  IGetProvidersCollectionCalendarAppointmentsReqBody,
  IGroupedServiceProvidersListResponse,
  IGroupedServiceProvidersParams,
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
    return axiosInstance.get<IAppointmentListResponse, IAxiosResponse<IAppointmentListResponse>>(
      `${baseURL}/v1/calendar/slot`,
      { params }
    );
  },
  getServiceProviders(params: IServiceProvidersReqParams) {
    return axiosInstance.get<IServiceProvidersListResponse, IAxiosResponsePaginated<IServiceProvidersListResponse>>(
      `${baseURL}/v1/provider`,
      {
        params
      }
    );
  },
  getGroupedServiceProviders(serviceProvidersData: IGroupedServiceProvidersParams) {
    return axiosInstance.post<
      IGroupedServiceProvidersListResponse,
      IAxiosResponsePaginated<IGroupedServiceProvidersListResponse>
    >(`${baseURL}/v2/provider`, serviceProvidersData);
  },
  getServiceTypes(params?: IServiceTypesReqParams) {
    return axiosInstance.get<IAppointmentTypesData, IAxiosResponse<IAppointmentTypesData>>(
      `${baseURL}/v1/service-type`,
      {
        params
      }
    );
  },
  createAppointment(appointmentValues: ICreateAppointmentBody) {
    return axiosInstance.post<ICreatedAppointmentResponse, IAxiosResponse<ICreatedAppointmentResponse>>(
      `${baseURL}/v1/appointment`,
      {
        ...appointmentValues
      }
    );
  },
  getAppointmentDetails(appointmentId: string) {
    return axiosInstance.get<IAppointmentDetailsResponse, IAxiosResponse<IAppointmentDetailsResponse>>(
      `${baseURL}/v1/appointment/${appointmentId}`
    );
  },
  editAppointment(appointmentId: string, appointmentValues: IEditAppointmentBody) {
    return axiosInstance.put<IUpdatedAppointmentResponse, IAxiosResponse<IUpdatedAppointmentResponse>>(
      `${baseURL}/v1/appointment/${appointmentId}`,
      appointmentValues
    );
  },

  cancelAppointment(appointmentId: string, body: ICancelAppointmentReqBody) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/appointment/${appointmentId}/cancel`, body);
  },

  getAppointmentList(body: IGetPatientAppointmentsListReqBody) {
    return axiosInstance
      .post<IGetPatientAppointmentsListResponse, IAxiosResponsePaginated<IGetPatientAppointmentsListResponse>>(
        `${baseURL}/v1/appointment/list`,
        body
      )
      .then(({ data }) => data);
  },
  getAppointmentListFilters() {
    return axiosInstance
      .get<IGetPatientAppointmentsListFiltersResponse, IAxiosResponse<IGetPatientAppointmentsListFiltersResponse>>(
        `${baseURL}/v1/appointment/filter`
      )
      .then(({ data }) => data);
  },
  getPatientAppointments(patientId: string) {
    return axiosInstance
      .get<IGetPatientAppointments, IAxiosResponse<IGetPatientAppointments>>(
        `${baseURL}/v1/profile-appointment/${patientId}`
      )
      .then(({ data }) => data);
  },
  getCollectionCalendarAppointmentFilters() {
    return axiosInstance
      .get<IGetCollectionCalendarAppointmentFilters, IAxiosResponse<IGetCollectionCalendarAppointmentFilters>>(
        `${baseURL}/v1/calendar/specimen-appointments/filters`
      )
      .then(({ data }) => data);
  },
  getProvidersCollectionCalendarAppointments(body: IGetProvidersCollectionCalendarAppointmentsReqBody) {
    return axiosInstance
      .post<IGetProvidersCollectionCalendarAppointments, IAxiosResponse<IGetProvidersCollectionCalendarAppointments>>(
        `${baseURL}/v1/calendar/specimen-appointments`,
        body
      )
      .then(({ data }) => data);
  },
  getPatientRecentAppointments(patientId: string) {
    return axiosInstance
      .get<IGetPatientRecentAppointments, IAxiosResponse<IGetPatientRecentAppointments>>(
        `${baseURL}/v1/profile-appointment/${patientId}/recent`
      )
      .then(({ data }) => data);
  }
};

export default bookingManager;
