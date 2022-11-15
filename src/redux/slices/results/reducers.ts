import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  IPendingTestStats,
  IResultsFilterCategory,
  IResultsList,
  IResultsProps,
  LabMachine,
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
  setLabMachines(state, action: IAction<LabMachine[]>) {
    state.labMachines = action.payload;
  },
  setIsLabMachinesLoading(state, action: IAction<boolean>) {
    state.islabMachinesLoading = action.payload;
  },
  setIsTestResultsDetailsLoading(state, action: IAction<boolean>) {
    state.isTestResultsDetailsLoading = action.payload;
  },
  setPendingSpecimenStats(state, action: IAction<IPendingTestStats[]>) {
    state.pendingSpecimenStats = action.payload;
  },
  setPendingSpecimenStatsLoadingState(state, action: IAction<boolean>) {
    state.isPendingSpecimenStatsLoading = action.payload;
  }
});

export default reducers;
