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
export interface IServiceProvidersReqParams {
  page: number;
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
  date: Date | string | null;
}

export interface IEditAppointmentBody {
  appointment: Omit<IEditAppointmentsDetails, 'id'>;
  serviceTypeId: string;
}

export interface IEditAppointmentsDetails {
  id: string;
  date: Date | string;
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
