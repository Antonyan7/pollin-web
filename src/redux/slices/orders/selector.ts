import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.orders;

const orderTypeOptions = createSelector([selector], (state) => state.orderTypeOptions);
const selectedOrderType = createSelector([selector], (state) => state.selectedOrderType);
const orderTypes = createSelector([selector], (state) => state.orderTypes);
const editableOrderDetails = createSelector([selector], (state) => state.editableOrderDetails);
const isOrderTypesLoading = createSelector([selector], (state) => state.isOrderTypesLoading);
const orderDetails = createSelector([selector], (state) => state.orderDetails);
const isOrderDetailsLoading = createSelector([selector], (state) => state.isOrderDetailsLoading);
const isCancellationReasonsLoading = createSelector([selector], (state) => state.isCancellationReasonsLoading);
const isOrdersFiltersLoading = createSelector([selector], (state) => state.isOrdersFiltersLoading);
const orderStatuses = createSelector([selector], (state) => state.orderStatuses);
const orderResultsFilters = createSelector([selector], (state) => state.orderResultsFilters);
const isOrderResultsFiltersLoading = createSelector([selector], (state) => state.isOrderResultsFiltersLoading);
const orderResultsByPatientList = createSelector([selector], (state) => state.orderResultsByPatientList);
const isOrderResultsByPatientListLoading = createSelector(
  [selector],
  (state) => state.isOrderResultsByPatientListLoading
);
const orderResultsStatuses = createSelector([selector], (state) => state.orderResultsStatuses);
const isOrdersListLoading = createSelector([selector], (state) => state.isOrdersListLoading);
const ordersList = createSelector([selector], (state) => state.ordersList);
const isRequisitionDownloaded = createSelector([selector], (state) => state.isRequisitionDownloaded);
const cancellationReasons = createSelector([selector], (state) => state.cancellationReasons);
const isCancelOrderLoading = createSelector([selector], (state) => state.isCancelOrderLoading);
const resultReviewedDate = createSelector([selector], (state) => state.reviewDate);
const resultReleaseDate = createSelector([selector], (state) => state.releaseDate);
const isTestResultReviewed = createSelector([selector], (state) => state.isTestResultReviewed);
const isTestResultReleased = createSelector([selector], (state) => state.isTestResultReleased);

export default {
  orderTypeOptions,
  selectedOrderType,
  orderTypes,
  editableOrderDetails,
  isOrderTypesLoading,
  orderDetails,
  isOrderDetailsLoading,
  orderResultsByPatientList,
  orderResultsFilters,
  orderResultsStatuses,
  ordersList,
  orderStatuses,
  resultReleaseDate,
  resultReviewedDate,
  isTestResultReleased,
  isTestResultReviewed,
  cancellationReasons,
  isCancellationReasonsLoading,
  isCancelOrderLoading,
  isOrderResultsByPatientListLoading,
  isOrderResultsFiltersLoading,
  isOrdersFiltersLoading,
  isOrdersListLoading,
  isRequisitionDownloaded
};
