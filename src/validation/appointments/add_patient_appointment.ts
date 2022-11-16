import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const addPatientAppointmentsValidationSchema = object({
  providerId: string().required(generateErrorMessage('ProviderId Id')),
  serviceTypeId: string().required(generateErrorMessage('Appointment type')),
  description: string().notRequired().max(250),
  date: date().required(generateErrorMessage('Date')).nullable(true)
});
