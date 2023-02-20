import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.results;

// External Result
const resultsList = createSelector([selector], (state) => state.external.resultsList);

const resultsFiltersList = createSelector([selector], (state) => state.external.resultFilters);
const isResultsLoading = createSelector([selector], (state) => state.external.isResultsListLoading);
const isResultsFiltersLoading = createSelector([selector], (state) => state.external.isResultsFiltersLoading);
const isPendingTestStatsLoading = createSelector([selector], (state) => state.external.isPendingTestStatsLoading);
const pendingTestStats = createSelector([selector], (state) => state.external.pendingTestStats);

// Common
const isTestResultsSubmitLoading = createSelector([selector], (state) => state.common.isTestResultsSubmitLoading);
const allTestsSpecimensList = createSelector([selector], (state) => state.common.allTestsSpecimensList);
const isTestResultsDetailsLoading = createSelector([selector], (state) => state.common.isTestResultsDetailsLoading);
const testResultsDetails = createSelector([selector], (state) => state.common.testResultsDetails);
const specimenActions = createSelector([selector], (state) => state.common.specimenActions);

// Tracking
const labMachines = createSelector([selector], (state) => state.tracking.labMachines);
const isLabMachinesLoading = createSelector([selector], (state) => state.tracking.isLabMachinesLoading);
const transportList = createSelector([selector], (state) => state.tracking.transportList);
const isTransportListLoading = createSelector([selector], (state) => state.tracking.isTransportListLoading);
const isSpecimenAddedToFolder = createSelector([selector], (state) => state.tracking.isSpecimenAddedToFolder);
const isLabsLoading = createSelector([selector], (state) => state.tracking.isLabsLoading);
const testResultLabs = createSelector([selector], (state) => state.tracking.labs);
const transportActions = createSelector([selector], (state) => state.tracking.transportActions);
const testResultStateStatus = createSelector([selector], (state) => state.tracking.testResultStateStatus);
const isAllTestsSpecimensListLoading = createSelector(
  [selector],
  (state) => state.common.isAllTestsSpecimensListLoading
);
const isCreatingTransportFolder = createSelector([selector], (state) => state.tracking.isCreatingTransportFolder);

const isTransportFolderDownloaded = createSelector([selector], (state) => state.tracking.isTransportFolderDownloaded);

const transportFolders = createSelector([selector], (state) => state.tracking.transportFolders);
const lastCreatedTransportFolder = createSelector([selector], (state) => state.tracking.lastCreatedTransportFolder);

// InHouse
const isSpecimensConfirmationButtonClicked = createSelector(
  [selector],
  (state) => state.inHouse.isSpecimensConfirmationButtonClicked
);
const isPendingSpecimenStatsLoading = createSelector(
  [selector],
  (state) => state.inHouse.isPendingSpecimenStatsLoading
);
const pendingSpecimenStats = createSelector([selector], (state) => state.inHouse.pendingSpecimenStats);
const specimensList = createSelector([selector], (state) => state.inHouse.specimensList);
const isSpecimensListLoading = createSelector([selector], (state) => state.inHouse.isSpecimensListLoading);
const isTestResultsSubmitWentSuccessful = createSelector(
  [selector],
  (state) => state.common.isTestResultsSubmitWentSuccessful
);
const specimensFiltersList = createSelector([selector], (state) => state.inHouse.specimensFilters);
const isSpecimensFiltersLoading = createSelector([selector], (state) => state.inHouse.isSpecimensFiltersLoading);

// Collection
const appointmentSpecimens = createSelector([selector], (state) => state.collection.appointmentSpecimens);
const isAppointmentSpecimensLoading = createSelector(
  [selector],
  (state) => state.collection.isAppointmentSpecimensLoading
);
const specimenStorageLocations = createSelector([selector], (state) => state.collection.specimenStorageLocations);
const isSpecimenStorageLocationsLoading = createSelector(
  [selector],
  (state) => state.collection.isSpecimenStorageLocationsLoading
);
const isSendingSpecimenCollectionData = createSelector(
  [selector],
  (state) => state.collection.isSendingSpecimenCollectionData
);
const specimensInTransportList = createSelector([selector], (state) => state.tracking.specimensInTransportList);
const shouldRefetchInTransportList = createSelector([selector], (state) => state.tracking.shouldRefetchInTransportList);
const isSpecimensInTransportListLoading = createSelector(
  [selector],
  (state) => state.collection.isSpecimensInTransportListLoading
);
const isUpdatingSpecimenCollectionAppointmentStatus = createSelector(
  [selector],
  (state) => state.collection.isUpdatingSpecimenCollectionAppointmentStatus
);

export default {
  allTestsSpecimensList,
  appointmentSpecimens,
  isAllTestsSpecimensListLoading,
  isAppointmentSpecimensLoading,
  isCreatingTransportFolder,
  isLabMachinesLoading,
  isLabsLoading,
  isPendingSpecimenStatsLoading,
  isPendingTestStatsLoading,
  isResultsFiltersLoading,
  isResultsLoading,
  isSendingSpecimenCollectionData,
  isSpecimensConfirmationButtonClicked,
  isSpecimensFiltersLoading,
  isSpecimensInTransportListLoading,
  isSpecimensListLoading,
  isSpecimenStorageLocationsLoading,
  isTestResultsDetailsLoading,
  isTestResultsSubmitLoading,
  isTestResultsSubmitWentSuccessful,
  isTransportListLoading,
  isSpecimenAddedToFolder,
  isTransportFolderDownloaded,
  isUpdatingSpecimenCollectionAppointmentStatus,
  labMachines,
  lastCreatedTransportFolder,
  pendingSpecimenStats,
  pendingTestStats,
  resultsFiltersList,
  resultsList,
  specimenActions,
  specimensFiltersList,
  specimensInTransportList,
  specimensList,
  specimenStorageLocations,
  testResultLabs,
  testResultsDetails,
  testResultStateStatus,
  transportActions,
  transportFolders,
  transportList,
  shouldRefetchInTransportList
};
