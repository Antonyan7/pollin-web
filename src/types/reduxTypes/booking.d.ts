import { IAppointmentDetails } from '@axios/managerBooking';

import { SlotTypes } from '../calendar';

export interface AppointmentDetailsProps {
  appointment: IAppointmentDetails;
  patient: IPatientInfo;
  serviceType?: IServiceType;
}

export interface BookingProps {
  appointments: IAppointment[];
  date: string;
  serviceProviders: IServiceProvider[];
  currentServiceProviderId: string;
  isCalendarLoading: boolean;
  currentAppointmentId: string;
  error: string | null;
  patientList: IPatientInfo[];
  serviceTypes: IServiceType[];
  appointmentDetails: AppointmentDetailsProps | null;
}

export interface IUniqueItem {
  id: string;
  title: string;
}

export interface IServiceProvider extends IUniqueItem {}

export interface IPatientInfo extends IUniqueItem {}
export interface IServiceType extends IUniqueItem {
  isVirtual?: boolean;
}

export interface IAppointment {
  id: string;
  isEditable: boolean;
  startTime: string;
  timeUnits: number;
  title: string;
  description: string;
  type: SlotTypes;
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
  description: string;
  end: string;
  start: string;
}
