import { IEmptyResponse } from 'manager/common';
import { ISortOrder } from 'types/patient';
import {
  IAppointment,
  ICancelStatusItem,
  IGroupedServiceProvider,
  IPatientInfo,
  IServiceProvider,
  IServiceType
} from 'types/reduxTypes/bookingStateTypes';

export interface IAppointmentListReqParams {
  resourceId: string;
  date: string;
}
export interface IServiceTypesReqParams {
  resourceId?: string;
}
export interface IServiceProvidersReqParams {
  page: number;
}

export interface IGroupedServiceProvidersParams {
  page: number;
  searchString?: string;
  specimenCollection?: boolean;
}

export interface IAppointmentListResponse {
  slots: IAppointment[];
}

export interface IServiceProvidersListResponse {
  providers: IServiceProvider[];
}

export interface IGroupedServiceProvidersListResponse {
  providers: IGroupedServiceProvider[];
}

export interface IPatientNamesResponseData {
  patients: IPatientInfo[];
}

export interface IAppointmentTypesData {
  serviceTypes: IServiceType[];
}

export interface ICreateAppointmentBody {
  resourceId?: string;
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
  appointment: IAppointmentDetails;
  patient: IPatientInfo;
  serviceType?: IServiceType;
  statusVariations: ICancelStatusItem[];
}

export interface ICancelAppointmentReqBody {
  appointment: ICancelAppointmentReason;
}

export interface ICancelAppointmentReason {
  cancellationReason: string;
}

export enum PatientAppointmentsSortField {
  Type = 'type',
  Date = 'date',
  Status = 'status'
}

export interface IGetPatientAppointmentsListReqBody {
  page: number;
  sortOrder: ISortOrder;
  sortByField: PatientAppointmentsFields;
  filters?: Omit<PatientAppointmentsFilterOptions, 'title'>[];
}

export interface IPatientAppointment {
  id: string;
  type: string;
  status: 'Booked' | 'Cancelled' | 'Fulfilled';
  date: string;
  time: string;
}

export interface IGetPatientAppointmentsListResponse {
  appointments: IPatientAppointment[];
}

export interface IPatientAppointmentsListFilterOptions {
  id: string;
  title: string;
}

export interface IPatientAppointmentsListFilter {
  title: string;
  options: IPatientAppointmentsListFilterOptions[];
}

export interface IGetPatientAppointmentsListFiltersResponse {
  filters: IPatientAppointmentsListFilter[];
}

export interface PatientAppointmentsFilterOptions {
  title: string;
  type: string;
  id: string;
}

export interface GroupedServiceProvidersOptions extends PatientAppointmentsFilterOptions {}

export enum PatientAppointmentsFields {
  Type = 'Type',
  Date = 'Date',
  Status = 'Status'
}
