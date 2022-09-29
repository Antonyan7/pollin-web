import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';
import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';
import { BlockSchedulingProps, DeleteScheduleTemplateProps, IScheduleTemplatesList } from 'types/reduxTypes/scheduling';

import { ModalName } from '../../../constants/modals';
import { viewsMiddleware } from '../views';

import slice from './slice';

const {
  setScheduleTemplates,
  setError,
  setScheduleBlock,
  setSchedulingListLoadingStatus,
  setServiceTypes,
  setSingleScheduleTemplate,
  setApplyScheduleState,
  setBlockScheduleState,
  setCalendarLoadingState
} = slice.actions;

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    const serviceTypes = response.data.data.serviceTypes.sort((a: IServiceType, b: IServiceType) => {
      if (a.title < b.title) {
        return -1;
      }

      if (a.title > b.title) {
        return 1;
      }

      return 0;
    });

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

const applyScheduleBlock = (applyBlockScheduleData: BlockSchedulingProps) => async (dispatch: AppDispatch) => {
  try {
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
    await API.scheduling.updateSingleTemplate(templateId, data);

    dispatch(setCalendarLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setCalendarLoadingState(false));
  }
};

const deleteTemplate = (templateId: DeleteScheduleTemplateProps) => async (dispatch: AppDispatch) => {
  try {
    await API.scheduling.deleteTemplate(templateId);

    dispatch(getSchedulingTemplates(1));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const createScheduleTemplate = (createScheduleTemplateData: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.scheduling.createTemplate(createScheduleTemplateData);

    if (response.data.status.code === 'succeed') {
      dispatch(
        viewsMiddleware.setRedirectionState({
          path: '/scheduling/schedule-template',
          params: '',
          apply: true
        })
      );
    } else {
      dispatch(
        viewsMiddleware.setModalState({
          name: ModalName.CreateTemplateModal,
          props: { title: response.data.data.title, message: response.data.data.message }
        })
      );
    }
  } catch (error) {
    Sentry.captureException(error);
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
  updateSingleSchedule,
  resetApplyStatusState,
  resetBlockStatusState,
  deleteTemplate
};
