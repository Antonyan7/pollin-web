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
  testResultsDetails: [],
  labMachines: [],
  error: null,
  isResultsListLoading: false,
  isResultsFiltersLoading: false,
  isPendingTestStatsLoading: false,
  isTestResultsDetailsLoading: false,
  islabMachinesLoading: false,
  pendingSpecimenStats: [],
  isPendingSpecimenStatsLoading: false
});
