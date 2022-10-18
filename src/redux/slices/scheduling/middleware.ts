import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';
import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { BlockSchedulingProps, DeleteScheduleTemplateProps, IScheduleTemplatesList } from 'types/reduxTypes/scheduling';

import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import { ModalName } from '../../../constants/modals';
import { viewsMiddleware } from '../views';

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
  setScheduleLoading
} = slice.actions;

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    const serviceTypes = sortServiceTypesByAlphabeticOrder(response.data.data.serviceTypes);

    dispatch(setServiceTypes(serviceTypes));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getSchedulingTemplates = (pageSize: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSchedulingListLoadingStatus(true));

    const response = await API.scheduling.getTemplatesList(pageSize);
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

export const applyScheduleTemplate = (data: IApplyScheduleData) => async (dispatch: AppDispatch) => {
  try {
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
    await API.scheduling.updateSingleTemplate(templateId, data);
  } catch (error) {
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
    } else {
      dispatch(setScheduleOverrides(response.data.data.data));
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ScheduleTemplatesErrorModal,
          props: { title: response.data.data.title, message: response.data.data.message }
        })
      );
    }
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setScheduleLoading(false));
  }
};

export default {
  getServiceTypes,
  getSchedulingTemplates,
  applyScheduleBlock,
  createScheduleTemplate,
  applyScheduleTemplate,
  getSingleSchedule,
  updateSingleSchedule,
  resetApplyStatusState,
  resetOverrides,
  resetBlockStatusState,
  deleteTemplate
};
