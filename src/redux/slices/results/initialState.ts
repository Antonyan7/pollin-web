import {
  IExternalTestResults,
  IInHouseTestResultsProps,
  ITestResultProps,
  ITestResultsCollection,
  ITestResultsCommonProps,
  ITestResultsTracking
} from 'types/reduxTypes/resultsStateTypes';

const getExternalResultsInitialState = (): IExternalTestResults => ({
  resultsList: {
    testResults: [],
    currentPage: 1,
    pageSize: 25,
    totalItems: 0
  },
  resultFilters: [],
  pendingTestStats: [],
  isResultsListLoading: false,
  isResultsFiltersLoading: false,
  isPendingTestStatsLoading: false
});

const getTrackingInitialState = (): ITestResultsTracking => ({
  transportList: {
    folders: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  labMachines: {
    machines: []
  },
  transportFolders: [],
  isCreatingTransportFolder: false,
  isLabMachinesLoading: false,
  isLabsLoading: false,
  isTransportListLoading: false,
  testResultStateStatus: {
    success: false,
    fail: false
  },
  transportActions: [],
  labs: [],
  isTransportFolderDownloaded: false,
  isTransportFoldersLoading: false,
  lastCreatedTransportFolderId: null
});

const getCollectionInitialState = (): ITestResultsCollection => ({
  appointmentSpecimens: null,
  isAppointmentSpecimensLoading: false,
  isSendingSpecimenCollectionData: false,
  isSpecimensInTransportListLoading: false,
  isSpecimenStorageLocationsLoading: false,
  specimenStorageLocations: [],
  specimensInTransportList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  }
});

const getInHouseInitialState = (): IInHouseTestResultsProps => ({
  isPendingSpecimenStatsLoading: false,
  isSpecimensFiltersLoading: false,
  isSpecimensConfirmationButtonClicked: false,
  isSpecimensListLoading: false,
  pendingSpecimenStats: [],
  specimensFilters: [],
  specimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    notFound: []
  }
});

const getCommonTestResultsInitialState = (): ITestResultsCommonProps => ({
  testResultsDetails: [],
  error: null,
  allTestsSpecimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    notFound: []
  },
  isAllTestsSpecimensListLoading: false,
  // Initial state of when isTestResultsSubmitWentSuccessful test result is not submitted yet.
  isTestResultsSubmitWentSuccessful: null,
  specimenActions: [],
  isTestResultsDetailsLoading: false,
  isTestResultsSubmitLoading: false
});

export const getInitialState = (): ITestResultProps => ({
  external: getExternalResultsInitialState(),
  common: getCommonTestResultsInitialState(),
  inHouse: getInHouseInitialState(),
  tracking: getTrackingInitialState(),
  collection: getCollectionInitialState()
});
