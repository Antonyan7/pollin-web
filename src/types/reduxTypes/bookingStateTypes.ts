import { IPagination } from '@axios/axiosTypes';
import { IAppointmentDetails } from '@axios/booking/managerBookingTypes';
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
}

export interface BookingProps {
  appointments: IAppointment[];
  date: string;
  serviceProviders: IServiceProviders;
  isServiceProvidersLoading: boolean;
  currentServiceProviderId: string;
  isCalendarLoading: boolean;
  currentAppointmentId: string;
  error: string | null;
  patientList: IPatientList;
  serviceTypes: IServiceType[];
  appointmentDetails: AppointmentDetailsProps | null;
  patientAlerts: AlertDetailsProps[];
  isAppoitmentLoading: boolean;
}

export interface IUniqueItem {
  id: string;
  title: string;
}

export interface IServiceProviders extends IPagination {
  providers: IServiceProvider[];
}
export interface IServiceProvider extends IUniqueItem {}

export interface IPatientInfo {
  id: string;
  name: string;
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
