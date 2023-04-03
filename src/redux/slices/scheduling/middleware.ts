import API from '@axios/API';
import { applyScheduleFormInitialValues } from '@components/Scheduling/applySchedule/constants/defaultValues';
import { SeveritiesType } from '@components/Scheduling/types';
import * as Sentry from '@sentry/nextjs';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import { AppDispatch } from 'redux/store';
import {
  IApplyScheduleData,
  ITemplateGroup,
  ITemplateOverlap,
  ScheduleTemplateErrorMessages
} from 'types/create-schedule';
import {
  BlockSchedulingProps,
  DeleteScheduleTemplateProps,
  IScheduleTemplatesList
} from 'types/reduxTypes/schedulingStateTypes';

import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import { CypressIds } from '../../../constants/cypressIds';
import { Translation } from '../../../constants/translations';
import { viewsMiddleware } from '../views';

import { defaultScheduleTemplateDetails } from './initialState';
import slice from './slice';

const {
  setScheduleTemplates,
  setScheduleBlock,
  setScheduleOverrides,
  setSchedulingListLoadingStatus,
  setServiceTypes,
  setSingleScheduleTemplate,
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
  } finally {
    dispatch(setSchedulingListLoadingStatus(false));
  }
};

export const applyScheduleTemplate =
  (data: IApplyScheduleData, reset: (value: typeof applyScheduleFormInitialValues) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsApplyingSchedule(true));

      await API.scheduling.applyScheduleTemplate(data);

      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS),
            dataCy: CypressIds.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS
          }
        })
      );
      reset(applyScheduleFormInitialValues);
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsApplyingSchedule(false));
    }
  };

const resetOverrides = () => async (dispatch: AppDispatch) => {
  dispatch(setScheduleOverrides([]));
};

const applyScheduleBlock =
  (applyBlockScheduleData: BlockSchedulingProps, reset: () => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setScheduleLoading(true));

      const response = await API.scheduling.applyScheduleBlock({
        resourceId: applyBlockScheduleData.resourceId,
        startDate: applyBlockScheduleData.startDate,
        endDate: applyBlockScheduleData.endDate,
        placeholderLabel: applyBlockScheduleData.placeholderLabel
      });

      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_SUCCESS),
            dataCy: CypressIds.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_SUCCESS
          }
        })
      );
      reset();
      dispatch(setScheduleBlock(response.data.data));
    } catch (error) {
      Sentry.captureException(error);
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
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setCalendarLoadingState(false));
  }
};

const updateSingleSchedule = (templateId: string, data: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCalendarLoadingState(true));
    dispatch(setScheduleLoading(true));

    await API.scheduling.updateSingleTemplate(templateId, data);

    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-templates',
        params: '',
        apply: true
      })
    );
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_SCHEDULING_EDIT_TEMPLATE_SUCCESSFULLY_UPDATED_MESSAGE),
          dataCy: CypressIds.PAGE_SCHEDULING_EDIT_TEMPLATE_SUCCESSFULLY_UPDATED_MESSAGE
        }
      })
    );
  } catch (originalError) {
    const error = originalError as AxiosError<ITemplateOverlap>;

    if (error?.response?.data?.data?.title === ScheduleTemplateErrorMessages.EditTemplateOverlapMessage) {
      dispatch(setScheduleOverrides(error.response.data.data.data));
    }

    Sentry.captureException(error);
  } finally {
    dispatch(setCalendarLoadingState(false));
    dispatch(setScheduleLoading(false));
  }
};

const deleteTemplate = (templateId: DeleteScheduleTemplateProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setScheduleLoading(true));
    await API.scheduling.deleteTemplate(templateId);
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_DELETED_MESSAGE),
          dataCy: CypressIds.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_DELETED_MESSAGE
        }
      })
    );
    dispatch(getSchedulingTemplates(1));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setScheduleLoading(false));
  }
};

const createScheduleTemplate = (createScheduleTemplateData: ITemplateGroup) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setScheduleLoading(true));

    await API.scheduling.createTemplate(createScheduleTemplateData);

    dispatch(
      viewsMiddleware.setRedirectionState({
        path: '/scheduling/schedule-templates',
        params: '',
        apply: true
      })
    );
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_CREATED_MESSAGE),
          dataCy: CypressIds.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_CREATED_MESSAGE
        }
      })
    );
  } catch (originalError) {
    const error = originalError as AxiosError<ITemplateOverlap>;

    if (error?.response?.data?.data?.title === ScheduleTemplateErrorMessages.CreateTemplateOverlapMessage) {
      dispatch(setScheduleOverrides(error.response.data.data.data));
    }

    Sentry.captureException(error);
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
  clearSingleSchedule,
  resetOverrides,
  deleteTemplate,
  getNewSchedulingTemplates
};
