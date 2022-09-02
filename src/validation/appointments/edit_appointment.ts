import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { object, string } from 'yup';

export const editAppointmentsValidationSchema = object({
  serviceType: string().required(generateErrorMessage('Appointment type')),
  patientId: string().required(generateErrorMessage('Patient')),
  description: string().notRequired().max(250),
  date: string().required(generateErrorMessage('Date')),
  status: string().required(generateErrorMessage('Status'))
});
