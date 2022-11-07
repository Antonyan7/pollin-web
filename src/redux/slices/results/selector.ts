import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.results;

const resultsList = createSelector([selector], (state) => state.resultsList);
const resultsFiltersList = createSelector([selector], (state) => state.resultFilters);
const isResultsLoading = createSelector([selector], (state) => state.isResultsListLoading);
const isResultsFiltersLoading = createSelector([selector], (state) => state.isResultsFiltersLoading);
const isPendingTestStatsLoading = createSelector([selector], (state) => state.isPendingTestStatsLoading);
const pendingTestStats = createSelector([selector], (state) => state.pendingTestStats);
const isTestResultDetailsLoading = createSelector([selector], (state) => state.isTestResultDetailsLoading);
const testResultDetails = createSelector([selector], (state) => state.testResultDetails);

export default {
  resultsList,
  isResultsLoading,
  isResultsFiltersLoading,
  resultsFiltersList,
  isPendingTestStatsLoading,
  pendingTestStats,
  isTestResultDetailsLoading,
  testResultDetails
};
