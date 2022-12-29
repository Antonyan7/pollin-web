import { Translation } from 'constants/translations';
import i18next from 'i18next';
import { PeriodType } from 'types/create-schedule';
import { array, number, object, string } from 'yup';

export const scheduleTemplateFormValidationSchema = object({
  name: string().max(50).required(),
  timePeriods: array().of(
    object().shape({
      days: array().of(number()).min(1),
      startTime: string()
        .required(i18next.t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_ERROR) as string)
        .nullable(true),
      endTime: string()
        .required(i18next.t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_ERROR) as string)
        .nullable(true),
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
