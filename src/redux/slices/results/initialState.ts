import {
  IExternalTestResults,
  IInHouseTestResultsProps,
  ITestResultProps,
  ITestResultsCollection,
  ITestResultsCommonProps,
  ITestResultsTracking
} from 'types/reduxTypes/resultsStateTypes';

import { DateUtil } from '@utils/date/DateUtil';

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
  transportListDate: DateUtil.representInClinicDate(),
  transportList: {
    folders: [],
    notFound: [],
    currentPage: 1,
    pageSize: 25,
    totalItems: 0
  },
  labMachines: {
    machines: []
  },
  transportFolders: [],
  isCreatingTransportFolder: false,
  isSpecimenAddedToFolder: false,
  isLabMachinesLoading: false,
  isLabsLoading: false,
  isTransportListLoading: false,
  transportActions: [],
  labs: [],
  isTransportFolderDownloaded: false,
  isTransportFoldersLoading: false,
  lastCreatedTransportFolder: null,
  specimensInTransportList: {
    transportFolder: {
      title: ''
    },
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  shouldRefetchInTransportList: false,
  shouldRefetchInAllSpecimensList: false,
  shouldRefetchTransportsList: false
});

const getCollectionInitialState = (): ITestResultsCollection => ({
  appointmentSpecimens: null,
  isAppointmentSpecimensLoading: false,
  isSendingSpecimenCollectionData: false,
  isSpecimensInTransportListLoading: false,
  isSpecimenStorageLocationsLoading: false,
  specimenStorageLocations: [],
  isUpdatingSpecimenCollectionAppointmentStatus: false
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
    pageSize: 25,
    totalItems: 0,
    notFound: []
  }
});

const getCommonTestResultsInitialState = (): ITestResultsCommonProps => ({
  testResultsDetails: [],
  allTestsSpecimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 25,
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
