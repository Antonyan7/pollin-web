import API from '@axios/API';
import { AppDispatch } from 'redux/store';
import { ITemplateGroup } from 'types/create-schedule';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';

import { viewsMiddleware } from '../views';

import slice from './slice';

const { setScheduleTemplates, setError, setScheduleBlock, setServiceTypes } = slice.actions;

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    dispatch(setServiceTypes(response.data.data.serviceTypes));
  } catch (error) {
    dispatch(setError(error));
  }
};

const getSchedulingTemplates = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.scheduling.getTemplatesList();

    dispatch(setScheduleTemplates(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

const applyScheduleBlock = (applyBlockScheduleData: BlockSchedulingProps) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.scheduling.applyScheduleBlock({
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

const createScheduleTemplate = (createScheduleTemplateData: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    await API.scheduling.createTemplate(createScheduleTemplateData);
    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-template',
        params: '',
        apply: true
      })
    );
  } catch (error) {
    dispatch(setError(error));
  }
};

export default {
  getServiceTypes,
  getSchedulingTemplates,
  applyScheduleBlock,
  createScheduleTemplate
};
