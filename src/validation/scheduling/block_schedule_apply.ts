import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, string } from 'yup';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: date().required(generateErrorMessage('Start Date')).nullable(false),
  startTime: date().required(generateErrorMessage('Start Time')).nullable(false),
  endDate: date().required(generateErrorMessage('End Date')).nullable(false),
  endTime: date().required(generateErrorMessage('End Time')).nullable(false),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
