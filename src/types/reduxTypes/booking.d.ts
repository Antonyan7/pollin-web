import { SlotTypes } from '../calendar';

export interface BookingProps {
  appointments: IAppointment[];
  date: string;
  serviceProviders: IServiceProvider[];
  currentServiceProviderId: string;
  currentAppointmentId: string;
  error: string | null;
}

export interface IServiceProvider {
  id: string;
  title: string;
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
  id: string;
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
