import {
  AppointmentDetailsProps,
  IAppointment,
  IPatientInfo,
  IServiceProvider,
  IServiceType
} from '../types/reduxTypes/booking';

import { IEmptyResponse } from './common';

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
  patients: IPatientInfo[];
}

export interface IAppointmentTypesData {
  serviceTypes: IServiceType[];
}

export interface ICreatedAppointmentBody {
  serviceTypeId: string;
  patientId: string;
  providerId?: string;
  description?: string;
  date: Date | string;
}

export interface IEditAppointmentBody {
  appointment: IAppointmentDetails;
  serviceTypeId: string;
}

export interface IAppointmentDetails {
  id: string;
  date: Date;
  status: string;
  description: string;
  cancellationReason?: string;
}
export interface ICreatedAppointmentResponse extends IEmptyResponse {}

export interface IUpdatedAppointmentResponse extends IEmptyResponse {}

export interface IAppointmentDetailsResponse {
  appointment: AppointmentDetailsProps;
}
