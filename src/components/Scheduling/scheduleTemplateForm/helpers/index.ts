import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';

export const getDefaultTimePeriodState = (): ISingleTemplate => ({
  days: new Array<number>(),
  startTime: null,
  endTime: null,
  periodType: PeriodType.ServiceType,
  serviceTypes: new Array<string>(),
  placeholderName: ''
});

export const getEmptyTemplateState = (): ITemplateGroup => ({
  name: '',
  timePeriods: [getDefaultTimePeriodState()]
});
