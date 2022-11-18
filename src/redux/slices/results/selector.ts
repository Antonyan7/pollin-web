import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.results;

const resultsList = createSelector([selector], (state) => state.resultsList);
const resultsFiltersList = createSelector([selector], (state) => state.resultFilters);
const isResultsLoading = createSelector([selector], (state) => state.isResultsListLoading);
const isResultsFiltersLoading = createSelector([selector], (state) => state.isResultsFiltersLoading);
const isPendingTestStatsLoading = createSelector([selector], (state) => state.isPendingTestStatsLoading);
const pendingTestStats = createSelector([selector], (state) => state.pendingTestStats);
const isTestResultsDetailsLoading = createSelector([selector], (state) => state.isTestResultsDetailsLoading);
const testResultsDetails = createSelector([selector], (state) => state.testResultsDetails);
const labMachines = createSelector([selector], (state) => state.labMachines);
const islabMachinesLoading = createSelector([selector], (state) => state.islabMachinesLoading);
const specimenActions = createSelector([selector], (state) => state.specimenActions);
const isPendingSpecimenStatsLoading = createSelector([selector], (state) => state.isPendingSpecimenStatsLoading);
const pendingSpecimenStats = createSelector([selector], (state) => state.pendingSpecimenStats);
const specimensList = createSelector([selector], (state) => state.specimensList);
const isSpecimensListLoading = createSelector([selector], (state) => state.isSpecimensListLoading);

export default {
  resultsList,
  isResultsLoading,
  isResultsFiltersLoading,
  resultsFiltersList,
  isPendingTestStatsLoading,
  pendingTestStats,
  isTestResultsDetailsLoading,
  testResultsDetails,
  labMachines,
  islabMachinesLoading,
  specimenActions,
  isPendingSpecimenStatsLoading,
  pendingSpecimenStats,
  specimensList,
  isSpecimensListLoading
};
