import { AutocompleteInputChangeReason } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const validateInputChange = (_: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
  if (reason === 'reset') {
    return '';
  }

  return value;
};

export const addAppointmentsValidationSchema = object({
  serviceTypeId: string().required(generateErrorMessage('Appointment type')),
  patientId: string().required(generateErrorMessage('Patient')),
  description: string().notRequired().max(250),
  date: date().required(generateErrorMessage('Date'))
});
