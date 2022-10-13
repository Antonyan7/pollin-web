import { IPagination } from '@axios/axios';
import { IAppointmentDetails } from '@axios/booking/managerBooking';
import { AlertDetailsProps, IPatientsResponse } from 'types/reduxTypes/patient-emr';

import { SlotTypes } from '../calendar';

export interface IPatientList extends IPagination, IPatientsResponse {
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
