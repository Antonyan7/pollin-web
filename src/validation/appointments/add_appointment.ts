import { AutocompleteInputChangeReason } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

import { futureDate180DaysAfter } from '@utils/dateUtils';

export const validateInputChange = (_: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
  if (reason === 'reset') {
    return '';
  }

  return value;
};

export const addAppointmentsValidationSchema = object({
  serviceTypeId: string().required(generateErrorMessage('Appointment type')),
  patientId: string().required(generateErrorMessage('Patient')),
  description: string().notRequired().max(250, 'Description is too much longer'),
  date: date()
    .max(futureDate180DaysAfter, "Can't select days for future more than 180 days")
    .required('Date & Start Time are required')
    .nullable(true)
});
