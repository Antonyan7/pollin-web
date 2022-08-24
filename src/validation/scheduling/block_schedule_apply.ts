import { date, object, string } from 'yup';

import { generateErrorMessage } from '@utils/generateErrorMessage';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: date().required(generateErrorMessage('Start Date')),
  startTime: date().required(generateErrorMessage('Start Time')),
  endDate: date().required(generateErrorMessage('End Date')),
  endTime: date().required(generateErrorMessage('End Time')),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
