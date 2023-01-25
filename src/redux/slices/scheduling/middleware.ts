import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';
import { AppDispatch } from 'redux/store';
import {
  IApplyScheduleData,
  ITemplateGroup,
  ITemplateOverlap,
  ScheduleTemplateErrorMessages
} from 'types/create-schedule';
import { ModalName } from 'types/modals';
import {
  BlockSchedulingProps,
  DeleteScheduleTemplateProps,
  IScheduleTemplatesList
} from 'types/reduxTypes/schedulingStateTypes';

import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import { viewsMiddleware } from '../views';

import { defaultScheduleTemplateDetails } from './initialState';
import slice from './slice';

const {
  setScheduleTemplates,
  setError,
  setScheduleBlock,
  setScheduleOverrides,
  setSchedulingListLoadingStatus,
  setServiceTypes,
  setSingleScheduleTemplate,
  setApplyScheduleState,
  setBlockScheduleState,
  setCalendarLoadingState,
  setScheduleLoading,
  setIsServiceTypesLoading,
  updateScheduleTemplates,
  setIsApplyingSchedule
} = slice.actions;

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsServiceTypesLoading(true));

    const response = await API.booking.getServiceTypes();

    const serviceTypes = sortServiceTypesByAlphabeticOrder(response.data.data.serviceTypes);

    dispatch(setServiceTypes(serviceTypes));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsServiceTypesLoading(false));
  }
};

const getSchedulingTemplates = (pageSize: number, complete?: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSchedulingListLoadingStatus(true));

    const response = await API.scheduling.getTemplatesList(pageSize, complete);
    const data: IScheduleTemplatesList = {
      totalItems: response.data.totalItems,
      pageSize: response.data.pageSize,
      currentPage: response.data.currentPage,
      templates: response.data.data.templates
    };

    dispatch(setScheduleTemplates(data));
    dispatch(setSchedulingListLoadingStatus(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setSchedulingListLoadingStatus(false));
  }
};

const getNewSchedulingTemplates = (pageSize: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSchedulingListLoadingStatus(true));

    const response = await API.scheduling.getTemplatesList(pageSize, false);

    const data: IScheduleTemplatesList = {
      totalItems: response.data.totalItems,
      pageSize: response.data.pageSize,
      currentPage: response.data.currentPage,
      templates: response.data.data.templates
    };

    dispatch(updateScheduleTemplates(data));
    dispatch(setSchedulingListLoadingStatus(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setSchedulingListLoadingStatus(false));
  }
};

export const applyScheduleTemplate = (data: IApplyScheduleData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsApplyingSchedule(true));

    await API.scheduling.applyScheduleTemplate(data);
    dispatch(
      setApplyScheduleState({
        success: true,
        fail: false
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(
      setApplyScheduleState({
        success: false,
        fail: true
      })
    );
  } finally {
    dispatch(setIsApplyingSchedule(false));
  }
};

export const resetApplyStatusState = () => async (dispatch: AppDispatch) => {
  dispatch(
    setApplyScheduleState({
      success: false,
      fail: false
    })
  );
};

export const resetBlockStatusState = () => async (dispatch: AppDispatch) => {
  dispatch(
    setBlockScheduleState({
      success: false,
      fail: false
    })
  );
};

const resetOverrides = () => async (dispatch: AppDispatch) => {
  dispatch(setScheduleOverrides([]));
};

const applyScheduleBlock = (applyBlockScheduleData: BlockSchedulingProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setScheduleLoading(true));

    const response = await API.scheduling.applyScheduleBlock({
      resourceId: applyBlockScheduleData.resourceId,
      startDate: applyBlockScheduleData.startDate,
      endDate: applyBlockScheduleData.endDate,
      placeholderLabel: applyBlockScheduleData.placeholderLabel
    });

    dispatch(
      setBlockScheduleState({
        success: true,
        fail: false
      })
    );
    dispatch(setScheduleBlock(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(
      setBlockScheduleState({
        success: false,
        fail: true
      })
    );
    dispatch(setError(error));
  } finally {
    dispatch(setScheduleLoading(false));
  }
};

const clearSingleSchedule = () => (dispatch: AppDispatch) => {
  dispatch(setSingleScheduleTemplate(defaultScheduleTemplateDetails));
};

const getSingleSchedule = (templateId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCalendarLoadingState(true));

    const response = await API.scheduling.getSingleTemplate(templateId);

    dispatch(setSingleScheduleTemplate(response.data.data));
    dispatch(setCalendarLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setCalendarLoadingState(false));
  }
};

const updateSingleSchedule = (templateId: string, data: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCalendarLoadingState(true));
    dispatch(setScheduleLoading(true));

    const response = await API.scheduling.updateSingleTemplate(templateId, data);

    if (response.data.status.code === 'succeed') {
      dispatch(
        viewsMiddleware.setRedirectionState({
          path: '/scheduling/schedule-templates',
          params: '',
          apply: true
        })
      );
      dispatch(setError(null));
    }
  } catch (originalError) {
    const error = originalError as AxiosError<ITemplateOverlap>;

    if (error?.response?.data?.data?.title === ScheduleTemplateErrorMessages.EditTemplateOverlapMessage) {
      dispatch(setScheduleOverrides(error.response.data.data.data));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ScheduleTemplatesErrorModal,
          props: { title: error.response.data.data.title, message: error.response.data.data.message }
        })
      );
    }

    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setCalendarLoadingState(false));
    dispatch(setScheduleLoading(false));
  }
};

const deleteTemplate = (templateId: DeleteScheduleTemplateProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setScheduleLoading(true));
    await API.scheduling.deleteTemplate(templateId);
    dispatch(getSchedulingTemplates(1));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setScheduleLoading(false));
  }
};

const createScheduleTemplate = (createScheduleTemplateData: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setScheduleLoading(true));

    const response = await API.scheduling.createTemplate(createScheduleTemplateData);

    if (response.data.status.code === 'succeed') {
      dispatch(
        viewsMiddleware.setRedirectionState({
          path: '/scheduling/schedule-templates',
          params: '',
          apply: true
        })
      );
      dispatch(setError(null));
    }
  } catch (originalError) {
    const error = originalError as AxiosError<ITemplateOverlap>;

    if (error?.response?.data?.data?.title === ScheduleTemplateErrorMessages.CreateTemplateOverlapMessage) {
      dispatch(setScheduleOverrides(error.response.data.data.data));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ScheduleTemplatesErrorModal,
          props: { title: error.response.data.data.title, message: error.response.data.data.message }
        })
      );
    }

    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setScheduleLoading(false));
  }
};

const cleanError = () => async (dispatch: AppDispatch) => {
  dispatch(setError(null));
};

export default {
  getServiceTypes,
  getSchedulingTemplates,
  applyScheduleBlock,
  createScheduleTemplate,
  applyScheduleTemplate,
  getSingleSchedule,
  updateSingleSchedule,
  clearSingleSchedule,
  resetApplyStatusState,
  resetOverrides,
  resetBlockStatusState,
  deleteTemplate,
  getNewSchedulingTemplates,
  cleanError
};
