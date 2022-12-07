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
const isTestResultsError = createSelector([selector], (state) => state.error);
const specimensFiltersList = createSelector([selector], (state) => state.specimensFilters);
const isSpecimensFiltersLoading = createSelector([selector], (state) => state.isSpecimensFiltersLoading);
const isLabsLoading = createSelector([selector], (state) => state.isLabsLoading);
const testResultLabs = createSelector([selector], (state) => state.labs);
const transportActions = createSelector([selector], (state) => state.transportActions);
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
const transportFolders = createSelector([selector], (state) => state.transportFolders);

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
  isPendingSpecimenStatsLoading,
  pendingSpecimenStats,
  specimensList,
  isSpecimensListLoading,
  isTestResultsError,
  specimensFiltersList,
  isSpecimensFiltersLoading,
  allTestsSpecimensList,
  isAllTestsSpecimensListLoading,
  isLabsLoading,
  testResultLabs,
  isCreatingTransportFolder,
  specimensInTransportList,
  isSpecimensInTransportListLoading,
  transportFolders
};
