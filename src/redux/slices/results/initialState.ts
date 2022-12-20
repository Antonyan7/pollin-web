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
  cancellationReasons: {
    reasons: []
  },
  isCancellOrderLoading: false,
  isCancellationReasonsLoading: false,
  reviewDate: '',
  releaseDate: '',
  isTestResultReviewed: false,
  isTestResultReleased: false,
  pendingSpecimenStats: [],
  isPendingSpecimenStatsLoading: false,
  specimensList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    notFound: []
  },
  isSpecimensConfirmationButtonClicked: false,
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
  appointmentSpecimens: null,
  isAppointmentSpecimensLoading: false,
  specimenStorageLocations: [],
  isSpecimenStorageLocationsLoading: false,
  isSendingSpecimenCollectionData: false,
  labs: [],
  isLabsLoading: false,
  isCreatingTransportFolder: false,
  specimensInTransportList: {
    specimens: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isTransportFolderDownloaded: false,
  isSpecimensInTransportListLoading: false,
  transportFolders: [],
  lastCreatedTransportFolderId: null,
  isTransportFoldersLoading: false,
  orderStatuses: [],
  orderResultsFilters: [],
  isOrderResultsFiltersLoading: false,
  orderResultsByPatientList: {
    testResults: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isOrderResultsByPatientListLoading: false,
  // Initial state of when isTestResultsSubmitWentSuccessful test result is not submitted yet.
  isTestResultsSubmitWentSuccessful: null,
  ordersFilters: [],
  isRequisitionDownloaded: false,
  isOrdersFiltersLoading: false,
  orderResultsStatuses: [],
  ordersList: {
    orders: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isOrdersListLoading: false,
  orderTypes: [],
  isOrderTypesLoading: false
});
