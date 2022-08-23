import schedulingManager from 'manager/schedulingManager';
import { AppDispatch } from 'redux/store';

import slice from './slice';

const { getScheduleTemplates, setError } = slice.actions;

const getSchedulingTemplates = () => async (dispatch: AppDispatch) => {
  try {
    const response = await schedulingManager.getTemplatesList();

    dispatch(getScheduleTemplates(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export default {
  getSchedulingTemplates
};
