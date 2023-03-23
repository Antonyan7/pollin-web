import { IEditAppointmentBody } from '@axios/booking/managerBookingTypes';
import { IEditAppointmentForm } from '@components/Modals/Booking/EditAppointmentsModal/form/initialValues';

export const mergeAppointmentDetails = (values: IEditAppointmentForm): IEditAppointmentBody => ({
  appointment: {
    date: values.date,
    status: values.status,
    description: values.description
  },
  serviceTypeId: values.serviceTypeId
});
