import {
  AppointmentDetailsProps,
  IAppointment,
  IPatientInfo,
  IServiceProvider,
  IServiceType
} from '../types/reduxTypes/booking';

import { IPagination } from './axios';
import { IEmptyResponse } from './common';

export interface IAppointmentListReqParams {
  resourceId: string;
  date: string;
}
export interface IServiceProvidersReqParams {
  page: number;
}

export interface IAppointmentListResponse {
  slots: IAppointment[];
}

export interface IServiceProvidersListResponse extends IPagination {
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
  appointment: IEditAppointmentsDetails;
  serviceTypeId: string;
}

export interface IEditAppointmentsDetails {
  date: Date;
  status: string;
  description: string;
}

export interface IAppointmentDetails extends IEditAppointmentsDetails {
  id: string;
  cancellationReason: string;
}
export interface ICreatedAppointmentResponse extends IEmptyResponse {}

export interface IUpdatedAppointmentResponse extends IEmptyResponse {}

export interface IAppointmentDetailsResponse {
  appointment: AppointmentDetailsProps;
}

export interface ICancelAppointmentReqBody {
  appointment: ICancelAppointmentReason;
}

export interface ICancelAppointmentReason {
  cancellationReason: string;
}
