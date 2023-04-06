import { IEditAppointmentBody } from '@axios/booking/managerBookingTypes';

export enum AppointmentStatusesThatRequireConfirmation {
  NoShow = 'NoShow',
  Done = 'Done'
}

export interface IAppointmentStatusChangeConfirmationModalProps {
  type: AppointmentStatusesThatRequireConfirmation;
  appointmentId: string;
  values: IEditAppointmentBody;
}
