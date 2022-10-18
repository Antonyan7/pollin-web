import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: date().required('Start date cannot be in the past.').nullable(true),
  startTime: date().required('Start time must occur before end time.').nullable(true),
  endDate: date().required('End date cannot be in the past.').nullable(true),
  endTime: date().required('End time must occur after start time.').nullable(true),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
