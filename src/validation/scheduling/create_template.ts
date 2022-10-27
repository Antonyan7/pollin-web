import { array, number, object, string } from 'yup';

export const createTemplateValidationSchema = object({
  name: string().max(50).required(),
  timePeriods: array().of(
    object().shape({
      days: array().of(number()).min(1),
      startTime: string().required().nullable(true),
      endTime: string().required().nullable(true),
      placeholderName: string().required()
    })
  )
});
