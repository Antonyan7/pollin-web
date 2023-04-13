import { ISpecimenLocation, ISpecimensForAppointment } from '@axios/results/resultsManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  IAllTestsSpecimensList,
  ILab,
  IPendingTestStats,
  IResultsList,
  ISpecimensFilterCategory,
  ISpecimensInTransportList,
  ISpecimensList,
  ITestResultProps,
  ITestResultsFilter,
  ITransportList,
  LabMachine,
  LastCreatedTransportFolder,
  SpecimenActions,
  TestResultsDetails
} from 'types/reduxTypes/resultsStateTypes';
import { ITransportFolder } from 'types/results';

const createReducer = <T extends SliceCaseReducers<ITestResultProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setResultsList(state, action: IAction<IResultsList>) {
    state.external.resultsList = action.payload;
  },
  setTransportList(state, action: IAction<ITransportList>) {
    state.tracking.transportList = action.payload;
  },
  setResultsSearchFilters(state, action: IAction<ITestResultsFilter[]>) {
    state.external.resultFilters = action.payload;
  },
  setResultsLoadingState(state, action: IAction<boolean>) {
    state.external.isResultsListLoading = action.payload;
  },
  setResultsFiltersLoadingState(state, action: IAction<boolean>) {
    state.external.isResultsFiltersLoading = action.payload;
  },
  setPendingTestStats(state, action: IAction<IPendingTestStats[]>) {
    state.external.pendingTestStats = action.payload;
  },
  setPendingTestStatsLoadingState(state, action: IAction<boolean>) {
    state.external.isPendingTestStatsLoading = action.payload;
  },
  setTestResultsDetails(state, action: IAction<TestResultsDetails[]>) {
    state.common.testResultsDetails = action.payload;
  },
  setSpecimenActions(state, action: IAction<SpecimenActions[]>) {
    state.common.specimenActions = action.payload;
  },
  setTransportActions(state, action: IAction<SpecimenActions[]>) {
    state.tracking.transportActions = action.payload;
  },

  setLabMachines(state, action: IAction<LabMachine>) {
    state.tracking.labMachines = action.payload;
  },
  setIsLabMachinesLoading(state, action: IAction<boolean>) {
    state.tracking.isLabMachinesLoading = action.payload;
  },
  setIsTestResultsDetailsLoading(state, action: IAction<boolean>) {
    state.common.isTestResultsDetailsLoading = action.payload;
  },
  setIsTestResultsSubmitLoading(state, action: IAction<boolean>) {
    state.common.isTestResultsSubmitLoading = action.payload;
  },
  setPendingSpecimenStats(state, action: IAction<IPendingTestStats[]>) {
    state.inHouse.pendingSpecimenStats = action.payload;
  },
  setPendingSpecimenStatsLoadingState(state, action: IAction<boolean>) {
    state.inHouse.isPendingSpecimenStatsLoading = action.payload;
  },
  setSpecimensList(state, action: IAction<ISpecimensList>) {
    state.inHouse.specimensList = action.payload;
  },
  setIsSpecimensListLoading(state, action: IAction<boolean>) {
    state.inHouse.isSpecimensListLoading = action.payload;
  },
  setSpecimensFilters(state, action: IAction<ISpecimensFilterCategory[]>) {
    state.inHouse.specimensFilters = action.payload;
  },
  setSpecimensFiltersLoadingState(state, action: IAction<boolean>) {
    state.inHouse.isSpecimensFiltersLoading = action.payload;
  },
  setAllTestsSpecimensList(state, action: IAction<IAllTestsSpecimensList>) {
    state.common.allTestsSpecimensList = action.payload;
  },
  setIsAllTestsSpecimensListLoading(state, action: IAction<boolean>) {
    state.common.isAllTestsSpecimensListLoading = action.payload;
  },
  setAppointmentSpecimens(state, action: IAction<ISpecimensForAppointment>) {
    state.collection.appointmentSpecimens = action.payload;
  },
  setIsAppointmentSpecimensLoading(state, action: IAction<boolean>) {
    state.collection.isAppointmentSpecimensLoading = action.payload;
  },
  setSpecimenStorageLocations(state, action: IAction<ISpecimenLocation[]>) {
    state.collection.specimenStorageLocations = action.payload;
  },
  setIsSpecimenStorageLocationsLoading(state, action: IAction<boolean>) {
    state.collection.isSpecimenStorageLocationsLoading = action.payload;
  },
  setIsSendingSpecimenCollectionData(state, action: IAction<boolean>) {
    state.collection.isSendingSpecimenCollectionData = action.payload;
  },
  setLabsLoadingState(state, action: IAction<boolean>) {
    state.tracking.isLabsLoading = action.payload;
  },
  setIsTransportFolderDownloaded(state, action: IAction<boolean>) {
    state.tracking.isTransportFolderDownloaded = action.payload;
  },
  setLabs(state, action: IAction<ILab[]>) {
    state.tracking.labs = action.payload;
  },
  setIsCreatingTransportFolderLoading(state, action: IAction<boolean>) {
    state.tracking.isCreatingTransportFolder = action.payload;
  },
  setTransportListDate(state, action: IAction<Date>) {
    state.tracking.transportListDate = action.payload;
  },
  setIsTransportListLoading(state, action: IAction<boolean>) {
    state.tracking.isTransportListLoading = action.payload;
  },
  setSpecimensInTransportList(state, action: IAction<ISpecimensInTransportList>) {
    state.tracking.specimensInTransportList = action.payload;
  },
  setIsSpecimenAddedToFolder(state, action: IAction<boolean>) {
    state.tracking.isSpecimenAddedToFolder = action.payload;
  },
  setIsSpecimensInTransportListLoading(state, action: IAction<boolean>) {
    state.collection.isSpecimensInTransportListLoading = action.payload;
  },
  setTransportFolders(state, action: IAction<ITransportFolder[]>) {
    state.tracking.transportFolders = action.payload;
  },
  setLastCreatedTransportFolder(state, action: IAction<LastCreatedTransportFolder | null>) {
    state.tracking.lastCreatedTransportFolder = action.payload;
  },
  setIsTransportFoldersLoading(state, action: IAction<boolean>) {
    state.tracking.isTransportFoldersLoading = action.payload;
  },
  setShouldRefetchInTransportList(state, action: IAction<boolean>) {
    state.tracking.shouldRefetchInTransportList = action.payload;
  },
  setShouldRefetchAllSpecimensList(state, action: IAction<boolean>) {
    state.tracking.shouldRefetchInAllSpecimensList = action.payload;
  },
  setShouldRefetchTransportsList(state, action: IAction<boolean>) {
    state.tracking.shouldRefetchTransportsList = action.payload;
  },
  setSpecimenConfirmButtonClicked(state, action: IAction<boolean>) {
    state.inHouse.isSpecimensConfirmationButtonClicked = action.payload;
  },
  setIsTestResultsSubmitWentSuccessful(state, action: IAction<boolean | null>) {
    state.common.isTestResultsSubmitWentSuccessful = action.payload;
  },
  setIsUpdatingSpecimenCollectionAppointmentStatus(state, action: IAction<boolean>) {
    state.collection.isUpdatingSpecimenCollectionAppointmentStatus = action.payload;
  }
});

export default reducers;
