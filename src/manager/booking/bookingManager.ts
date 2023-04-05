import { IAxiosResponse, IAxiosResponsePaginated } from '@axios/axiosTypes';
import {
  IAppointmentDetailsResponse,
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IAppointmentTypesData,
  ICancelAppointmentReqBody,
  ICheckInReqBody,
  ICreateAppointmentBody,
  ICreatedAppointmentResponse,
  IEditAppointmentBody,
  IGetCheckInAppointmentResponse,
  IGetCollectionCalendarAppointmentFilters,
  IGetPatientAppointmentsListFiltersResponse,
  IGetPatientAppointmentsListReqBody,
  IGetPatientAppointmentsListResponse,
  IGetPatientRecentAppointments,
  IGetProvidersCollectionCalendarAppointments,
  IGetProvidersCollectionCalendarAppointmentsReqBody,
  IGroupedServiceProvidersListResponse,
  IGroupedServiceProvidersParams,
  IPatientProfileAppointmentsGroups,
  IServiceTypesReqParams,
  IUpdatedAppointmentResponse
} from '@axios/booking/managerBookingTypes';
import { Axios } from 'manager/axiosInstance';
import { ICheckInSuccessResponse, ISpecimenCollectionAppointment } from 'types/reduxTypes/bookingStateTypes';

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
  updateSpecimenCollectionAppointmentStatus(appointment: ISpecimenCollectionAppointment) {
    return axiosInstance.patch<ISpecimenCollectionAppointment, IAxiosResponse<ISpecimenCollectionAppointment>>(
      `${baseURL}/v1/calendar/specimen-appointments`,
      { appointment }
    );
  },
  checkInAppointment(body: ICheckInReqBody) {
    return axiosInstance.patch<ICheckInSuccessResponse, IAxiosResponse<ICheckInSuccessResponse>>(
      `${baseURL}/v1/appointment/check-in`,
      body
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
      .get<IPatientProfileAppointmentsGroups, IAxiosResponse<IPatientProfileAppointmentsGroups>>(
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
  },
  getCheckInAppointments(patientId: string) {
    return axiosInstance.get<IGetCheckInAppointmentResponse, IAxiosResponse<IGetCheckInAppointmentResponse>>(
      `${baseURL}/v1/appointment/check-in-list`,
      {
        params: { patientId }
      }
    );
  }
};

export default bookingManager;
