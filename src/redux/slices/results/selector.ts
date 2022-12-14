import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.results;

const resultsList = createSelector([selector], (state) => state.resultsList);
const transportList = createSelector([selector], (state) => state.transportList);
const resultsFiltersList = createSelector([selector], (state) => state.resultFilters);
const isResultsLoading = createSelector([selector], (state) => state.isResultsListLoading);
const isResultsFiltersLoading = createSelector([selector], (state) => state.isResultsFiltersLoading);
const isPendingTestStatsLoading = createSelector([selector], (state) => state.isPendingTestStatsLoading);
const pendingTestStats = createSelector([selector], (state) => state.pendingTestStats);
const isTestResultsDetailsLoading = createSelector([selector], (state) => state.isTestResultsDetailsLoading);
const testResultsDetails = createSelector([selector], (state) => state.testResultsDetails);
const labMachines = createSelector([selector], (state) => state.labMachines);
const isLabMachinesLoading = createSelector([selector], (state) => state.isLabMachinesLoading);
const specimenActions = createSelector([selector], (state) => state.specimenActions);
const isPendingSpecimenStatsLoading = createSelector([selector], (state) => state.isPendingSpecimenStatsLoading);
const pendingSpecimenStats = createSelector([selector], (state) => state.pendingSpecimenStats);
const specimensList = createSelector([selector], (state) => state.specimensList);
const isSpecimensListLoading = createSelector([selector], (state) => state.isSpecimensListLoading);
const isTestResultsSubmitWentSuccessful = createSelector(
  [selector],
  (state) => state.isTestResultsSubmitWentSuccessful
);
const specimensFiltersList = createSelector([selector], (state) => state.specimensFilters);
const isSpecimensFiltersLoading = createSelector([selector], (state) => state.isSpecimensFiltersLoading);
const isLabsLoading = createSelector([selector], (state) => state.isLabsLoading);
const testResultLabs = createSelector([selector], (state) => state.labs);
const transportActions = createSelector([selector], (state) => state.transportActions);
const cancellationReasons = createSelector([selector], (state) => state.cancellationReasons);
const isCancellOrderLoading = createSelector([selector], (state) => state.isCancellOrderLoading);
const resultReviewedDate = createSelector([selector], (state) => state.reviewDate);
const resultReleaseDate = createSelector([selector], (state) => state.releaseDate);
const isTestResultReviewed = createSelector([selector], (state) => state.isTestResultReviewed);
const isTestResultReleased = createSelector([selector], (state) => state.isTestResultReleased);
const isTestResultsSubmitLoading = createSelector([selector], (state) => state.isTestResultsSubmitLoading);
const allTestsSpecimensList = createSelector([selector], (state) => state.allTestsSpecimensList);
const testResultStateStatus = createSelector([selector], (state) => state.testResultStateStatus);
const isAllTestsSpecimensListLoading = createSelector([selector], (state) => state.isAllTestsSpecimensListLoading);
const isCreatingTransportFolder = createSelector([selector], (state) => state.isCreatingTransportFolder);
const specimensInTransportList = createSelector([selector], (state) => state.specimensInTransportList);
const isSpecimensInTransportListLoading = createSelector(
  [selector],
  (state) => state.isSpecimensInTransportListLoading
);
const isCancellationReasonsLoading = createSelector([selector], (state) => state.isCancellationReasonsLoading);
const transportFolders = createSelector([selector], (state) => state.transportFolders);
const lastCreatedTransportFolderId = createSelector([selector], (state) => state.lastCreatedTransportFolderId);
const isSpecimensConfirmationButtonClicked = createSelector(
  [selector],
  (state) => state.isSpecimensConfirmationButtonClicked
);
const orderStatuses = createSelector([selector], (state) => state.orderStatuses);
const orderResultsFilters = createSelector([selector], (state) => state.orderResultsFilters);
const isOrderResultsFiltersLoading = createSelector([selector], (state) => state.isOrderResultsFiltersLoading);
const isOrdersListLoading = createSelector([selector], (state) => state.isOrdersListLoading);
const ordersList = createSelector([selector], (state) => state.ordersList);

export default {
  testResultStateStatus,
  resultsList,
  transportList,
  isResultsLoading,
  isResultsFiltersLoading,
  resultsFiltersList,
  isPendingTestStatsLoading,
  pendingTestStats,
  isTestResultsDetailsLoading,
  testResultsDetails,
  labMachines,
  isLabMachinesLoading,
  isTestResultsSubmitLoading,
  specimenActions,
  transportActions,
  cancellationReasons,
  isCancellOrderLoading,
  isCancellationReasonsLoading,
  resultReviewedDate,
  resultReleaseDate,
  isTestResultReviewed,
  isTestResultReleased,
  isPendingSpecimenStatsLoading,
  pendingSpecimenStats,
  specimensList,
  isSpecimensListLoading,
  isTestResultsSubmitWentSuccessful,
  specimensFiltersList,
  isSpecimensFiltersLoading,
  allTestsSpecimensList,
  isAllTestsSpecimensListLoading,
  isLabsLoading,
  testResultLabs,
  isCreatingTransportFolder,
  specimensInTransportList,
  isSpecimensInTransportListLoading,
  transportFolders,
  lastCreatedTransportFolderId,
  isSpecimensConfirmationButtonClicked,
  orderStatuses,
  orderResultsFilters,
  isOrderResultsFiltersLoading,
  isOrdersListLoading,
  ordersList
};
