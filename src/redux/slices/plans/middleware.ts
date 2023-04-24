import API from '@axios/API';
import { SeveritiesType } from '@components/Scheduling/types';
import { viewsMiddleware } from '@redux/slices/views';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { INewPatientPlan, IOrderPatientPlanRequestData, IPlanMutation } from 'types/reduxTypes/plansTypes';

import slice from './slice';

const {
  setIsPlansListLoading,
  setPlansList,
  setIsStatusVariationsLoading,
  setStatusVariations,
  setIsCategoriesLoading,
  setCategories,
  setIsReadyToOrderPlansLoading,
  setReadyToOrderPatientPlans,
  setIsReadyToOrderPlansUpdating,
  setIsCreatingPlan,
  setIsPatientPlanDetailsLoading,
  setPatientPlanDetails,
  setIsPatientPreliminaryBloodsResultsLoading,
  setPatientPreliminaryBloodsResults
} = slice.actions;

const getPatientPlansList = (patientId: string, page?: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPlansListLoading(true));

    const response = await API.plans.getPatientPlansList({ patientId, page });
    const data = {
      ...response.data.data,
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize
    };

    dispatch(setPlansList(data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPlansListLoading(false));
  }
};

const getPatientPlansStatuses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsStatusVariationsLoading(true));

    const response = await API.plans.getPatientPlansStatuses();

    dispatch(setStatusVariations(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsStatusVariationsLoading(false));
  }
};

const getPlanCategoriesAndTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCategoriesLoading(true));

    const response = await API.plans.getPlanCategoriesAndTypes();

    dispatch(setCategories(response.data.data.categories));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsCategoriesLoading(false));
  }
};

const getPatientPlansReadyToOrder = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsReadyToOrderPlansLoading(true));

    const response = await API.plans.getPatientPlansReadyToOrder(patientId);

    dispatch(setReadyToOrderPatientPlans(response.data.data.patientPlans));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsReadyToOrderPlansLoading(false));
  }
};

const markThePlanAsCancelled = (data: IPlanMutation) => async (dispatch: AppDispatch) => {
  try {
    await API.plans.markThePlanAsCancelled(data);
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_PATIENT_PLANS_TOAST_SUCCESSFUL_SENT)
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  }
};

const markThePlanAsActive = (data: IPlanMutation) => async (dispatch: AppDispatch) => {
  try {
    await API.plans.markThePlanAsActive(data);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_PATIENT_PLANS_TOAST_SUCCESSFUL_SENT)
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  }
};

const markThePlanAsCompleted = (data: IPlanMutation) => async (dispatch: AppDispatch) => {
  try {
    await API.plans.markThePlanAsCompleted(data);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_PATIENT_PLANS_TOAST_SUCCESSFUL_SENT)
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  }
};

const orderPlansToPatient = (data: IOrderPatientPlanRequestData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsReadyToOrderPlansUpdating(true));

    await API.plans.orderPlansToPatient(data);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_PATIENT_PLANS_TOAST_SUCCESSFUL_SENT)
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsReadyToOrderPlansUpdating(false));
  }
};

const createPatientPlan = (data: INewPatientPlan, successCallback?: () => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCreatingPlan(true));

    const response = await API.plans.createPatientPlan(data);

    if (response) {
      successCallback?.();
    }
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsCreatingPlan(false));
  }
};

const getPlanDetails = (planId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientPlanDetailsLoading(true));

    const response = await API.plans.getPatientPlanDetails(planId);

    dispatch(setPatientPlanDetails(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientPlanDetailsLoading(false));
  }
};

const getPatientPreliminaryBloods = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientPreliminaryBloodsResultsLoading(true));

    const response = await API.results.getPatientPreliminaryBloods(patientId);

    dispatch(setPatientPreliminaryBloodsResults(response.data.data.testResults));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientPreliminaryBloodsResultsLoading(false));
  }
};

export default {
  getPatientPlansList,
  getPatientPlansStatuses,
  getPlanCategoriesAndTypes,
  markThePlanAsCancelled,
  markThePlanAsActive,
  markThePlanAsCompleted,
  getPatientPlansReadyToOrder,
  orderPlansToPatient,
  createPatientPlan,
  getPlanDetails,
  getPatientPreliminaryBloods
};
