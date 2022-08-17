import { AutocompleteInputChangeReason } from '@mui/material';
import { object, string } from 'yup';

import { generateErrorMessage } from '@utils/generateErrorMessage';

export const validateInputChange = (_: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
  if (reason === 'reset') {
    return '';
  }

  return value;
};

export const addAppointmentsValidationSchema = object({
  appointmentTypeId: string().required(generateErrorMessage('Appointment type')),
  patientId: string().required(generateErrorMessage('Patient')),
  description: string().notRequired().max(250),
  date: string().required(generateErrorMessage('Date'))
});
