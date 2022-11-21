import { PeriodType } from 'types/create-schedule';
import { array, number, object, string } from 'yup';

export const createTemplateValidationSchema = object({
  name: string().max(50).required(),
  timePeriods: array().of(
    object().shape({
      days: array().of(number()).min(1),
      startTime: string()
        .required()
        .nullable(true)
        .test('startTimeBefore', (value, testContext) => {
          const endTime = new Date(testContext.parent.endTime);
          const startTime = new Date(value as string);

          return endTime.getTime() >= startTime.getTime();
        }),
      endTime: string()
        .required()
        .nullable(true)
        .test('endTimeAfter', (value, testContext) => {
          const endTime = new Date(testContext.parent.startTime);
          const startTime = new Date(value as string);

          return endTime.getTime() <= startTime.getTime();
        }),
      periodType: string().required(),
      serviceTypes: array().test('serviceTypes', (value, testContext) => {
        const isPeriodServiceType = testContext.parent.periodType === PeriodType.ServiceType;
        const isPeriodServiceEmpty = isPeriodServiceType && value?.length === 0;

        return !isPeriodServiceEmpty;
      }),
      placeholderName: string().required()
    })
  )
});
