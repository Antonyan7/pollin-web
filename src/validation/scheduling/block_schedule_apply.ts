import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { date, object, ref, string } from 'yup';

export const blockScheduleValidationSchema = object({
  resourceId: string().required(generateErrorMessage('Resource Id')),
  startDate: date()
    .required(generateErrorMessage('Start Date'))
    .nullable(true)
    .max(ref('endDate'), 'Start date must occur before end date.'),
  endDate: date()
    .required(generateErrorMessage('End Date'))
    .nullable(true)
    .min(ref('startDate'), 'End Date must occur after start date'),
  placeholderLabel: string().required(generateErrorMessage('Placeholder Label'))
});
