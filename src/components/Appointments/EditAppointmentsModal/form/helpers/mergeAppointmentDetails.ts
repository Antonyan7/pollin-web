import { IEditAppointmentBody } from '@axios/managerBooking';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';

import { IFormValues } from '../types';

export const mergeAppointmentDetails = (
  details: AppointmentDetailsProps,
  values: IFormValues
): IEditAppointmentBody => ({
  appointment: {
    id: details.appointment.id,
    date: values.date,
    status: values.status,
    description: values.description
  },
  serviceTypeId: values.serviceType
});
