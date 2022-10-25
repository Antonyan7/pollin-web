import { IApplyScheduleDay } from 'types/apply-schedule';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';
import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

export const defaultResource: IServiceProvider = {
  id: '',
  title: ''
};

export const defaultScheduleTemplate: SchedulingTemplateProps = {
  id: '',
  name: '',
  duration: '',
  lastSavedDay: '',
  status: ''
};

export const defaultRepeatWeeks: IApplyScheduleDay = {
  id: 0,
  name: ''
};
