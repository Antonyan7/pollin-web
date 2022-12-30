import { ISingleTemplate, ITemplateGroup, PeriodType } from 'types/create-schedule';
import { v4 } from 'uuid';

export const getDefaultTimePeriodState = (): ISingleTemplate => ({
  id: v4(),
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
