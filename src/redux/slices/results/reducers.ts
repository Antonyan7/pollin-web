import { IOrdersStatusesItems } from '@axios/results/resultsManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  CancellationReasons,
  IAllTestsSpecimensList,
  ILab,
  IOrderResultsFilterCategory,
  IOrdersList,
  IPendingTestStats,
  IResultsFilterCategory,
  IResultsList,
  IResultsProps,
  ISpecimensFilterCategory,
  ISpecimensInTransportList,
  ISpecimensList,
  ITransportList,
  LabMachine,
  SpecimenActions,
  TestResultsDetails
} from 'types/reduxTypes/resultsStateTypes';
import { SchedulingStateStatusProps } from 'types/reduxTypes/schedulingStateTypes';
import { ITransportFolder } from 'types/results';

const createReducer = <T extends SliceCaseReducers<IResultsProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
  setResultsList(state, action: IAction<IResultsList>) {
    state.resultsList = action.payload;
  },
  setTransportList(state, action: IAction<ITransportList>) {
    state.transportList = action.payload;
  },
  setResultsSearchFilters(state, action: IAction<IResultsFilterCategory[]>) {
    state.resultFilters = action.payload;
  },
  setResultsLoadingState(state, action: IAction<boolean>) {
    state.isResultsListLoading = action.payload;
  },
  setResultsFiltersLoadingState(state, action: IAction<boolean>) {
    state.isResultsFiltersLoading = action.payload;
  },
  setPendingTestStats(state, action: IAction<IPendingTestStats[]>) {
    state.pendingTestStats = action.payload;
  },
  setPendingTestStatsLoadingState(state, action: IAction<boolean>) {
    state.isPendingTestStatsLoading = action.payload;
  },
  setTestResultsDetails(state, action: IAction<TestResultsDetails[]>) {
    state.testResultsDetails = action.payload;
  },
  setSpecimenActions(state, action: IAction<SpecimenActions[]>) {
    state.specimenActions = action.payload;
  },
  setTransportActions(state, action: IAction<SpecimenActions[]>) {
    state.transportActions = action.payload;
  },
  setCancellationReasons(state, action: IAction<CancellationReasons>) {
    state.cancellationReasons = action.payload;
  },
  setIsCancellOrderLoading(state, action: IAction<boolean>) {
    state.isCancellOrderLoading = action.payload;
  },
  setIsCancellationReasonsLoading(state, action: IAction<boolean>) {
    state.isCancellationReasonsLoading = action.payload;
  },
  setTestResultReviewedDate(state, action: IAction<string>) {
    state.reviewDate = action.payload;
  },
  setIsTestResultReviewed(state, action: IAction<boolean>) {
    state.isTestResultReviewed = action.payload;
  },
  setIsTestResultReleased(state, action: IAction<boolean>) {
    state.isTestResultReleased = action.payload;
  },
  setTestResultReleasedDate(state, action: IAction<string>) {
    state.releaseDate = action.payload;
  },
  setLabMachines(state, action: IAction<LabMachine>) {
    state.labMachines = action.payload;
  },
  setIsLabMachinesLoading(state, action: IAction<boolean>) {
    state.isLabMachinesLoading = action.payload;
  },
  setIsTestResultsDetailsLoading(state, action: IAction<boolean>) {
    state.isTestResultsDetailsLoading = action.payload;
  },
  setIsTestResultsSubmitLoading(state, action: IAction<boolean>) {
    state.isTestResultsSubmitLoading = action.payload;
  },
  setPendingSpecimenStats(state, action: IAction<IPendingTestStats[]>) {
    state.pendingSpecimenStats = action.payload;
  },
  setPendingSpecimenStatsLoadingState(state, action: IAction<boolean>) {
    state.isPendingSpecimenStatsLoading = action.payload;
  },
  setSpecimensList(state, action: IAction<ISpecimensList>) {
    state.specimensList = action.payload;
  },
  setIsSpecimensListLoading(state, action: IAction<boolean>) {
    state.isSpecimensListLoading = action.payload;
  },
  setSpecimensFilters(state, action: IAction<ISpecimensFilterCategory[]>) {
    state.specimensFilters = action.payload;
  },
  setSpecimensFiltersLoadingState(state, action: IAction<boolean>) {
    state.isSpecimensFiltersLoading = action.payload;
  },
  setAllTestsSpecimensList(state, action: IAction<IAllTestsSpecimensList>) {
    state.allTestsSpecimensList = action.payload;
  },
  setIsAllTestsSpecimensListLoading(state, action: IAction<boolean>) {
    state.isAllTestsSpecimensListLoading = action.payload;
  },
  setLabsLoadingState(state, action: IAction<boolean>) {
    state.isLabsLoading = action.payload;
  },
  setLabs(state, action: IAction<ILab[]>) {
    state.labs = action.payload;
  },
  setIsCreatingTransportFolderLoading(state, action: IAction<boolean>) {
    state.isCreatingTransportFolder = action.payload;
  },
  setTestResultsState(state, action: IAction<SchedulingStateStatusProps>) {
    state.testResultStateStatus = action.payload;
  },
  setIsTransportListLoading(state, action: IAction<boolean>) {
    state.isTransportListLoading = action.payload;
  },
  setSpecimensInTransportList(state, action: IAction<ISpecimensInTransportList>) {
    state.specimensInTransportList = action.payload;
  },
  setIsSpecimensInTransportListLoading(state, action: IAction<boolean>) {
    state.isSpecimensInTransportListLoading = action.payload;
  },
  setTransportFolders(state, action: IAction<ITransportFolder[]>) {
    state.transportFolders = action.payload;
  },
  setLastCreatedTransportFolderId(state, action: IAction<string | null>) {
    state.lastCreatedTransportFolderId = action.payload;
  },
  setIsTransportFoldersLoading(state, action: IAction<boolean>) {
    state.isTransportFoldersLoading = action.payload;
  },
  setOrdersStatuses(state, action: IAction<IOrdersStatusesItems[]>) {
    state.orderStatuses = action.payload;
  },
  setOrderResultsFilters(state, action: IAction<IOrderResultsFilterCategory[]>) {
    state.orderResultsFilters = action.payload;
  },
  setOrderResultsFiltersLoadingState(state, action: IAction<boolean>) {
    state.isOrderResultsFiltersLoading = action.payload;
  },
  setIsTestResultsSubmitWentSuccessful(state, action: IAction<boolean | null>) {
    state.isTestResultsSubmitWentSuccessful = action.payload;
  },
  setOrdersList(state, action: IAction<IOrdersList>) {
    state.ordersList = action.payload;
  },
  setIsOrdersListLoading(state, action: IAction<boolean>) {
    state.isOrdersListLoading = action.payload;
  }
});

export default reducers;
