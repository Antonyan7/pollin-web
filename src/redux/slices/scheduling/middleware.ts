import API from '@axios/API';
import { AppDispatch } from 'redux/store';
import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { BlockSchedulingProps } from 'types/reduxTypes/scheduling';

import { viewsMiddleware } from '../views';

import slice from './slice';

const {
  setScheduleTemplates,
  setError,
  setScheduleBlock,
  setSchedulingListLoadingStatus,
  setServiceTypes,
  setSingleScheduleTemplate,
  setApplyScheduleSuccess,
  setBlockScheduleSuccess,
  setCalendarLoadingState
} = slice.actions;

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    dispatch(setServiceTypes(response.data.data.serviceTypes));
  } catch (error) {
    dispatch(setError(error));
  }
};

const getSchedulingTemplates = (pageSize: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSchedulingListLoadingStatus(true));

    const response = await API.scheduling.getTemplatesList(pageSize);

    dispatch(setScheduleTemplates(response.data.data));
    dispatch(setSchedulingListLoadingStatus(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setSchedulingListLoadingStatus(false));
  }
};

export const applyScheduleTemplate = (data: IApplyScheduleData) => async (dispatch: AppDispatch) => {
  try {
    await API.scheduling.applyScheduleTemplate(data);
    dispatch(setApplyScheduleSuccess(true));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setApplyScheduleSuccess(false));
  }
};

export const resetSuccessStatusState = () => async (dispatch: AppDispatch) => {
  dispatch(setApplyScheduleSuccess(false));
};

export const resetBlockSuccessStatusState = () => async (dispatch: AppDispatch) => {
  dispatch(setBlockScheduleSuccess(false));
};

const applyScheduleBlock = (applyBlockScheduleData: BlockSchedulingProps) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.scheduling.applyScheduleBlock({
      resourceId: 'providerId2',
      startDate: applyBlockScheduleData.startDate,
      endDate: applyBlockScheduleData.endDate,
      placeholderLabel: applyBlockScheduleData.placeholderLabel
    });

    dispatch(setBlockScheduleSuccess(true));
    dispatch(setScheduleBlock(response.data.data));
  } catch (error) {
    dispatch(setBlockScheduleSuccess(false));
    dispatch(setError(error));
  }
};

const getSingleSchedule = (templateId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCalendarLoadingState(true));

    const response = await API.scheduling.getSingleTemplate(templateId);

    dispatch(setSingleScheduleTemplate(response.data.data));
    dispatch(setCalendarLoadingState(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setCalendarLoadingState(false));
  }
};

const deleteTemplate = (templateId: string[]) => async (dispatch: AppDispatch) => {
  try {
    await API.scheduling.deleteTemplate(templateId);

    dispatch(getSchedulingTemplates(1));
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
  createScheduleTemplate,
  applyScheduleTemplate,
  getSingleSchedule,
  resetSuccessStatusState,
  resetBlockSuccessStatusState,
  deleteTemplate
};
