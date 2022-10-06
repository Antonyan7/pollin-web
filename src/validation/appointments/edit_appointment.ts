import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const editAppointmentsValidationSchema = object({
  appointment: object({
    id: string(),
    description: string().notRequired().max(250),
    date: date().required(generateErrorMessage('Date')).nullable(false),
    status: string().required(generateErrorMessage('Status')),
    cancellationReason: string()
  }),
  serviceType: object({
    id: string().required(generateErrorMessage('Appointment type')),
    title: string()
  }).notRequired()
});
