import { IPagination } from '@axios/axiosTypes';
import {
  IAppointmentDetails,
  IPatientProfileAppointmentsGroups,
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

export interface BookingProps {
  appointments: IAppointment[];
  shouldUpdateBookingCalendarAppointments: boolean;
  date: Date;
  groupedServiceProviders: IGroupedServiceProviders;
  specimenGroupedServiceProviders: IGroupedServiceProviders;
  isGroupedServiceProvidersLoading: boolean;
  isSpecimenGroupedServiceProvidersLoading: boolean;
  isServiceTypesLoading: boolean;
  isAppointmentEditLoading: boolean;
  isRefreshCheckInAppointments: boolean;
  currentServiceProviderId: string;
  isCheckInLoading: boolean;
  isCheckInSuccess: boolean;
  currentSpecimenServiceProviderId: string;
  isBookingCalendarLoading: boolean;
  isCollectionCalendarLoading: boolean;
  currentAppointmentId: string;
  patientList: IPatientList;
  isCheckInAppointmentsLoading: boolean;
  checkInAppointmentsList: ICheckInAppointment[];
  serviceTypes: IServiceType[];
  appointmentDetails: AppointmentDetailsProps | null;
  patientAlerts: AlertDetailsProps[];
  profilePatientAppointmentsGroups: IPatientProfileAppointmentsGroups;
  isAppointmentLoading: boolean;
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

export interface IServiceProvider extends IUniqueItem {
  type: string;
}

export enum CheckInStatuses {
  Booked = 'Booked',
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
  NoShow = 'NoShow',
  InProgress = 'InProgress'
}

export interface ICheckInAppointment {
  id: string;
  type: string;
  status: CheckInStatuses;
  date: string;
  checkInAllowed: boolean;
}

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
  status: string;
}

export interface ICheckInSuccessResponse {
  appointments: ISingleCheckInAppointment[];
}

export interface ISingleCheckInAppointment {
  id: string;
  type: string;
  status: string;
  date: string;
  checkInAllowed: boolean;
  askForPartners: boolean;
}

export interface ICalendarSlot {
  id?: string;
  title: string;
  allDay: boolean;
  borderColor?: string;
  classNames: string[];
  display?: string;
  textColor: string;
  color: string;
  end: Date;
  start: Date;
}

export interface ISpecimenAppointmentsFilter {
  title: string;
  type: string;
  options: IUniqueItem[];
}

export interface ISpecimenAppointmentsState {
  date: Date;
  list: IProvidersCollectionCalendarAppointment[];
  filters: ISpecimenAppointmentsFilter[] | null;
  selectedFilters: SpecimenCollectionFilterOption[];
  isFiltersArrayLoading: boolean;
}

export enum AppointmentStatus {
  Booked = 'Booked',
  InProgress = 'In Progress',
  Cancelled = 'Cancelled',
  CheckedIn = 'Checked-In',
  Confirmed = 'Confirmed',
  NoShow = 'No Show',
  Done = 'Done',
  RunningLate = 'Running Late'
}

export type AppointmentStatusEnumKey = keyof typeof AppointmentStatus;
