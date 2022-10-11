import { IEditAppointmentBody } from '@axios/managerBooking';

import { IFormValues } from '../types';

export const mergeAppointmentDetails = (values: IFormValues): IEditAppointmentBody => ({
  appointment: {
    date: values.appointment.date,
    status: values.appointment.status,
    description: values.appointment.description
  },
  serviceTypeId: values?.serviceType?.id ?? ''
});
