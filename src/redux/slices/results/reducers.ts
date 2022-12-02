import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  IAllTestsSpecimensList,
  ILab,
  IPendingTestStats,
  IResultsFilterCategory,
  IResultsList,
  IResultsProps,
  ISpecimensFilterCategory,
  ISpecimensList,
  ITransportList,
  LabMachine,
  SpecimenActions,
  TestResultsDetails
} from 'types/reduxTypes/resultsStateTypes';

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
  setLabMachines(state, action: IAction<LabMachine[]>) {
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
  setIsTransportListLoading(state, action: IAction<boolean>) {
    state.isTransportListLoading = action.payload;
  }
});

export default reducers;
