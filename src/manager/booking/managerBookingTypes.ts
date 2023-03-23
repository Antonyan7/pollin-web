import { IEmptyResponse } from 'manager/common';
import { ISortOrder, SortOrder } from 'types/patient';
import {
  AppointmentStatus,
  IAppointment,
  ICancelStatusItem,
  ICheckinAppointment,
  IGroupedServiceProvider,
  IPatientInfo,
  IServiceProvider,
  IServiceType,
  IUniqueItem
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

export interface ICheckInReqBody {
  patientId: string;
  appointments: { id: string }[];
}

export interface ICreateAppointmentBody {
  providerId?: string;
  serviceTypeId: string;
  patientId: string;
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
  provider: IUniqueItem;
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
  filters?: Omit<PatientAppointmentsFilterOption, 'title'>[];
}

export interface IPatientAppointment {
  id: string;
  type: string;
  status: PatientAppointmentStatuses;
  date: string;
  time: string;
}

export enum PatientAppointmentStatuses {
  Booked = 'Booked',
  Cancelled = 'Cancelled',
  Fulfilled = 'Fulfilled'
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
  type: string;
  options: IPatientAppointmentsListFilterOptions[];
}

export interface IGetPatientAppointmentsListFiltersResponse {
  filters: IPatientAppointmentsListFilter[];
}

export interface PatientAppointmentsFilterOption {
  id: string;
  title: string;
  type: string;
}

export interface GroupedServiceProvidersOption extends PatientAppointmentsFilterOption {}

export enum PatientAppointmentsFields {
  Type = 'Type',
  Date = 'Date',
  Status = 'Status'
}

export interface IGetPatientAppointments {
  upcoming: {
    filter: string;
    sortOrder: SortOrder;
    sortByField: PatientAppointmentsSortField;
    appointments: IPatientAppointment[];
  };
  past: {
    filter: string;
    sortOrder: SortOrder;
    sortByField: PatientAppointmentsSortField;
    appointments: IPatientAppointment[];
  };
}

export interface SpecimenCollectionFilterOption {
  id: string;
  title: string;
  type: string;
}

export interface ICollectionCalendarAppointmentFilterOption {
  id: string;
  title: string;
}

export interface ICollectionCalendarAppointmentFilter {
  title: string;
  type: string;
  options: ICollectionCalendarAppointmentFilterOption[];
}

export interface IGetCollectionCalendarAppointmentFilters {
  filters: ICollectionCalendarAppointmentFilter[];
}

export interface IProvidersCollectionCalendarAppointment extends IAppointment {
  status?: AppointmentStatus;
}

export interface IGetProvidersCollectionCalendarAppointments {
  appointments: IProvidersCollectionCalendarAppointment[];
}

export interface ProvidersCollectionCalendarAppointmentsReqBodyFilter {
  id: string;
}

export interface IGetProvidersCollectionCalendarAppointmentsReqBody {
  resourceId: string;
  date: string;
  filters: ProvidersCollectionCalendarAppointmentsReqBodyFilter[];
}

export interface IPatientRecentAppointment {
  id: string;
  type: string;
  date: string;
}

export interface IGetCheckInAppointmentResponse {
  appointments: ICheckinAppointment[];
}

export interface IGetPatientRecentAppointments {
  appointments: IPatientRecentAppointment[];
}
