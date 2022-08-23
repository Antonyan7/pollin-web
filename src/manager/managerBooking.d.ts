import { IAppointment, IServiceProvider } from '../types/reduxTypes/booking';

export interface IAppointmentListReqParams {
  resourceId: string;
  date: string;
}

export interface IAppointmentListResponse {
  slots: IAppointment[];
}

export interface IServiceProvidersListResponse {
  providers: IServiceProvider[];
}

export interface IPatientNamesResponseData {
  patients: PatientNamesProps[];
}

export interface IAppointmentTypesData {
  serviceTypes: AppointmentTypesProps[];
}

export interface ICreatedAppointmentData {
  data: null;
}

export interface IUpdatedAppointmentData {
  data: null;
}

export interface IAppointmentDetailsData {
  appointment: AppointmentDetailsProps;
}
