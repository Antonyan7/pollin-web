import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { object, string } from 'yup';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: string().required(generateErrorMessage('Start Date')).nullable(),
  startTime: string().required(generateErrorMessage('Start Time')).nullable(),
  endDate: string().required(generateErrorMessage('End Date')).nullable(),
  endTime: string().required(generateErrorMessage('End Time')).nullable(),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
