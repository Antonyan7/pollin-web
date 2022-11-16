import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { object, string } from 'yup';

export const editAppointmentsValidationSchema = object({
  appointment: object({
    id: string(),
    description: string().notRequired().max(250),
    date: string().required(generateErrorMessage('Date')).nullable(false),
    status: string().required(generateErrorMessage('Status')),
    cancellationReason: string()
  }),
  serviceType: object({
    id: string().required(generateErrorMessage('Appointment type')),
    title: string()
  }).notRequired()
});
