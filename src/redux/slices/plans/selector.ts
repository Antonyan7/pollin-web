import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.plans;

const statusVariations = createSelector([selector], (state) => state.statusVariations);
const isStatusVariationsLoading = createSelector([selector], (state) => state.isStatusVariationsLoading);
const plansList = createSelector([selector], (state) => state.plansList);
const isPlansListLoading = createSelector([selector], (state) => state.isPlansListLoading);
const categories = createSelector([selector], (state) => state.categories);
const isCategoriesLoading = createSelector([selector], (state) => state.isCategoriesLoading);
const readyToOrderPatientPlans = createSelector([selector], (state) => state.readyToOrderPatientPlans);
const isReadyToOrderPlansLoading = createSelector([selector], (state) => state.isReadyToOrderPlansLoading);
const isReadyToOrderPlansUpdating = createSelector([selector], (state) => state.isReadyToOrderPlansUpdating);
const patientPreliminaryBloodsResults = createSelector([selector], (state) => state.patientPreliminaryBloodsResults);
const isPatientPreliminaryBloodsResultsLoading = createSelector(
  [selector],
  (state) => state.isPatientPreliminaryBloodsResultsLoading
);
const isCreatingPlan = createSelector([selector], (state) => state.isCreatingPlan);
const planDetails = createSelector([selector], (state) => state.planDetails.details?.patientPlan);
const isPlanDetailsLoading = createSelector([selector], (state) => state.planDetails.isPlanDetailsLoading);

export default {
  statusVariations,
  isStatusVariationsLoading,
  plansList,
  isPlansListLoading,
  categories,
  isCategoriesLoading,
  readyToOrderPatientPlans,
  isReadyToOrderPlansLoading,
  isReadyToOrderPlansUpdating,
  patientPreliminaryBloodsResults,
  isPatientPreliminaryBloodsResultsLoading,
  isCreatingPlan,
  planDetails,
  isPlanDetailsLoading
};
