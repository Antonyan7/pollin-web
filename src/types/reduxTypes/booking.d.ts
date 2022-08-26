import { SlotTypes } from '../calendar';

export interface CreateAppointmentProps {
  appointmentTypeId: string;
  patientId: string;
  description?: string;
  date: Date | string;
}

export interface AppointmentDetailsProps {
  appointmentType: { id: string; title: string };
  date: Date;
  status: string;
  description: string;
  cancellationReason: string;
  isVirtual?: boolean;
  patient: { id: string; name: string };
}
export interface BookingProps {
  appointments: IAppointment[];
  date: string;
  serviceProviders: IServiceProvider[];
  currentServiceProviderId: string;
  currentAppointmentId: string;
  error: string | null;
  patientList: IPatientData[];
  serviceTypes: IServiceType[];
  appointmentDetails: AppointmentDetailsProps | null;
}

export interface IServiceProvider {
  id: string;
  title: string;
}

export interface IPatientData extends IServiceProvider {}
export interface IServiceType {
  id: string;
  title: string;
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
  textColor: string;
  color: string;
  description: string;
  end: string;
  start: string;
}
