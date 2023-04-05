import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';
import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

import { ApplyScheduleFields } from '../types';

export const defaultResource: IServiceProvider = {
  id: '',
  title: '',
  type: ''
};

export const defaultScheduleTemplate: SchedulingTemplateProps = {
  id: '',
  name: '',
  duration: '',
  lastSavedDay: '',
  status: ''
};

export const applyScheduleFormInitialValues = {
  [ApplyScheduleFields.RESOURCE]: { ...defaultResource },
  [ApplyScheduleFields.SCHEDULE_TEMPLATE]: { ...defaultScheduleTemplate },
  [ApplyScheduleFields.WEEKS_REPEAT_COUNT]: null,
  [ApplyScheduleFields.START_SCHEDULE_DATE]: null,
  [ApplyScheduleFields.END_SCHEDULE_DATE]: null,
  [ApplyScheduleFields.SELECTED_WEEKDAYS_TO_APPLY]: []
};
