import { IEditAppointmentBody } from '@axios/booking/managerBooking';

import { IFormValues } from '../types';

export const mergeAppointmentDetails = (values: IFormValues): IEditAppointmentBody => ({
  appointment: {
    date: values.appointment.date,
    status: values.appointment.status,
    description: values.appointment.description
  },
  serviceTypeId: values?.serviceType?.id ?? ''
});
