import { IPatientInfo } from 'types/reduxTypes/bookingStateTypes';

export enum AddAppointmentSources {
  Booking = 'booking',
  Profile = 'profile'
}

export interface AddAppointmentModalProps {
  start?: Date;
  source: AddAppointmentSources;
  patient: IPatientInfo;
  providerId?: string;
}
