import { IEditAppointmentBody } from '@axios/managerBooking';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';

import { IFormValues } from '../types';

export const mergeAppointmentDetails = (
  details: AppointmentDetailsProps,
  values: IFormValues
): IEditAppointmentBody => ({
  appointment: {
    date: values.appointment.date,
    status: values.appointment.status,
    description: values.appointment.description
  },
  serviceTypeId: values?.serviceType?.id ?? ''
});
