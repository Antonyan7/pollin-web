import { IAppointmentDetails } from '@axios/booking/managerBooking';
import { IServiceType } from 'types/reduxTypes/booking';

export interface IFormValues {
  appointment: IAppointmentDetails;
  patient: { id: string; name: string };
  serviceType?: IServiceType;
}
