import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { boolean, date, object, string } from 'yup';

export const editAppointmentsValidationSchema = object({
  appointment: object({
    id: string()
  }),
  description: string().notRequired().max(250, 'Description is too long'),
  date: date().required(generateErrorMessage('Date')).nullable(false),
  status: string().required(generateErrorMessage('Status')),
  cancellationReason: string(),
  serviceTypeId: string().required(generateErrorMessage('Appointment type')),
  isVirtual: boolean()
});
