import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { ITestResultLatest, TestResultProps } from 'types/reduxTypes/testResults';

const createReducer = <T extends SliceCaseReducers<TestResultProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action: IAction<string | null>) {
    state.error = action.payload;
  },
  setProfileTestResult(state, action: IAction<ITestResultLatest[]>) {
    state.profileTestResult = action.payload;
  }
});

export default reducers;
