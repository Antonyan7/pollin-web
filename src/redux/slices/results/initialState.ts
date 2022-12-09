import { IResultsProps } from 'types/reduxTypes/resultsStateTypes';

export const getInitialState = (): IResultsProps => ({
  resultsList: {
    testResults: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  transportList: {
    folders: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  resultFilters: [],
  pendingTestStats: [],
  testResultsDetails: [],
  labMachines: {
    machines: []
  },
  error: null,
  isResultsListLoading: false,
  isTransportListLoading: false,
  isResultsFiltersLoading: false,
  isPendingTestStatsLoading: false,
  isTestResultsDetailsLoading: false,
  isLabMachinesLoading: false,
  isTestResultsSubmitLoading: false,
  specimenActions: [],
  transportActions: [],
  pendingSpecimenStats: [],
  isPendingSpecimenStatsLoading: false,
  specimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    notFound: []
  },
  isSpecimensListLoading: false,
  specimensFilters: [],
  isSpecimensFiltersLoading: false,
  allTestsSpecimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    notFound: []
  },
  testResultStateStatus: {
    success: false,
    fail: false
  },
  isAllTestsSpecimensListLoading: false,
  labs: [],
  isLabsLoading: false,
  isCreatingTransportFolder: false,
  specimensInTransportList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isSpecimensInTransportListLoading: false,
  transportFolders: [],
  lastCreatedTransportFolderId: null,
  isTransportFoldersLoading: false
});
