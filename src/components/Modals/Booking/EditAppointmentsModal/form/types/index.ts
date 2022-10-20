import { IAppointmentDetails } from '@axios/booking/managerBookingTypes';
import { IServiceType } from 'types/reduxTypes/bookingStateTypes';

export interface IFormValues {
  appointment: IAppointmentDetails;
  patient: { id: string; name: string };
  serviceType?: IServiceType;
}
