import schedulingManager from 'manager/schedulingManager';
import { AppDispatch } from 'redux/store';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';

import slice from './slice';

const { getScheduleTemplates, setError, setScheduleBlock } = slice.actions;

const getSchedulingTemplates = () => async (dispatch: AppDispatch) => {
  try {
    const response = await schedulingManager.getTemplatesList();

    dispatch(getScheduleTemplates(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

const applyScheduleBlock = (applyBlockScheduleData: BlockSchedulingProps) => async (dispatch: AppDispatch) => {
  try {
    const response = await schedulingManager.applyScheduleBlock({
      resourceId: 'providerId2',
      startDate: applyBlockScheduleData.startDate,
      endDate: applyBlockScheduleData.endDate,
      placeholderLabel: applyBlockScheduleData.placeholderLabel
    });

    dispatch(setScheduleBlock(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export default {
  getSchedulingTemplates,
  applyScheduleBlock
};
