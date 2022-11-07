import { IResultsProps } from 'types/reduxTypes/resultsStateTypes';

export const getInitialState = (): IResultsProps => ({
  resultsList: {
    testResults: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  resultFilters: [],
  pendingTestStats: [],
  testResultDetails: null,
  error: null,
  isResultsListLoading: false,
  isResultsFiltersLoading: false,
  isPendingTestStatsLoading: false,
  isTestResultDetailsLoading: false
});
