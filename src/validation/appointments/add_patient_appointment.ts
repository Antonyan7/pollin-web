import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const addPatientAppointmentsValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  serviceTypeId: string().required(generateErrorMessage('Appointment type')),
  description: string().notRequired().max(250),
  date: date().required(generateErrorMessage('Date')).nullable(true)
});
