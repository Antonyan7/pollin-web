import schedulingManager from '@axios/schedulingManager';

import { ITemplateGroup } from '../../types/create-schedule';
import { dispatch } from '../hooks';
import { scheduleTemplate } from '../slices/schedule-template';

export const createScheduleTemplate = (data: ITemplateGroup) => async () => {
  try {
    await schedulingManager.createTemplate(data);
  } catch (e) {
    dispatch(scheduleTemplate.actions.hasError(e));
  }
};
