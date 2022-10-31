import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, ref, string } from 'yup';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: date()
    .required(generateErrorMessage('Start Date'))
    .nullable(true)
    .max(ref('endDate'), 'Start date must occur before end date.'),
  startTime: date()
    .required(generateErrorMessage('Start Time'))
    .nullable(true)
    .max(ref('endTime'), 'Start time must occur before end time.'),
  endDate: date()
    .required(generateErrorMessage('End Date'))
    .nullable(true)
    .min(ref('startDate'), 'End Date must occur after start date'),
  endTime: date()
    .required(generateErrorMessage('End Time'))
    .nullable(true)
    .min(ref('startTime'), 'End time must occur after start time.'),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
