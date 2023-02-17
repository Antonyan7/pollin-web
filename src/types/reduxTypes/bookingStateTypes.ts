import { IPagination } from '@axios/axiosTypes';
import {
  IAppointmentDetails,
  IProvidersCollectionCalendarAppointment,
  SpecimenCollectionFilterOption
} from '@axios/booking/managerBookingTypes';
import { IPatientsData } from '@axios/patientEmr/managerPatientEmrTypes';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

import { SlotTypes } from '../calendar';

export interface IPatientList extends IPagination {
  patients: IPatientsData[];
  isLoading: boolean;
}

export interface AppointmentDetailsProps {
  appointment: IAppointmentDetails;
  patient: IPatientInfo;
  serviceType?: IServiceType;
  statusVariations: ICancelStatusItem[];
  provider: IUniqueItem;
}

export interface AppointmentStatusProps {
  fail: boolean;
  success: boolean;
}

export interface AppointmentStatusState {
  create: AppointmentStatusProps;
  edit: AppointmentStatusProps;
  cancel: AppointmentStatusProps;
}

export interface IAppointmentErrorState {
  message: string;
  code: string;
}

export interface BookingProps {
  appointments: IAppointment[];
  date: string;
  serviceProviders: IServiceProviders;
  groupedServiceProviders: IGroupedServiceProviders;
  specimenGroupedServiceProviders: IGroupedServiceProviders;
  isServiceProvidersLoading: boolean;
  isGroupedServiceProvidersLoading: boolean;
  isSpecimenGroupedServiceProvidersLoading: boolean;
  isServiceTypesLoading: boolean;
  currentServiceProviderId: string;
  currentSpecimenServiceProviderId: string;
  isCalendarLoading: boolean;
  currentAppointmentId: string;
  error: string | null;
  patientList: IPatientList;
  serviceTypes: IServiceType[];
  appointmentDetails: AppointmentDetailsProps | null;
  patientAlerts: AlertDetailsProps[];
  isAppointmentLoading: boolean;
  isSaveButtonDisabled: boolean;
  appointmentStatus: AppointmentStatusState;
  createAppointmentError: IAppointmentErrorState;
  editAppointmentErrorState: IAppointmentErrorState;
  cancelAppointmentErrorState: IAppointmentErrorState;
  specimenAppointments: ISpecimenAppointmentsState;
}

export interface IUniqueItem {
  id: string;
  title: string;
}

export interface ICancelStatusItem extends IUniqueItem {}

export interface IUniqueItemPatient {
  id: string;
  name: string;
}

export interface IServiceProviders extends IPagination {
  providers: IServiceProvider[];
}
export interface IServiceProvider extends IUniqueItem {}

export interface IGroupedServiceProviders extends IPagination {
  providers: IGroupedServiceProvider[];
  searchString?: string;
}
export interface IGroupedServiceProvider {
  groupId: string;
  groupTitle: string;
  items: IUniqueItem[];
}

export interface IPatientInfo {
  id: string;
  name: string;
  dateOfBirth?: string;
}

export interface IPatientOption {
  firstLetter: string;
  item: IPatientInfo;
}

export interface IServiceType extends IUniqueItem {
  isVirtual?: boolean;
}

export interface IAppointment {
  id: string;
  type: SlotTypes;
  startTime: string;
  timeUnits: number;
  title: string;
  isEditable: boolean;
  color: string;
}

export interface ISpecimenCollectionAppointment {
  id: string;
  status: AppointmentStatus.InProgress;
}

export interface ICalendarSlot {
  id?: string;
  title: string;
  allDay: boolean;
  borderColor: string;
  classNames: string[];
  display?: string;
  textColor: string;
  color: string;
  end: string;
  start: string;
}

export interface ISpecimenAppointmentsFilter {
  title: string;
  type: string;
  options: IUniqueItem[];
}

export interface ISpecimenAppointmentsState {
  list: IProvidersCollectionCalendarAppointment[];
  filters: ISpecimenAppointmentsFilter[] | null;
  selectedFilters: SpecimenCollectionFilterOption[];
  isFiltersArrayLoading: boolean;
}

export enum AppointmentStatus {
  Booked = 'Booked',
  InProgress = 'InProgress'
}
