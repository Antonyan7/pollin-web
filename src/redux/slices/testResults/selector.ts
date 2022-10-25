import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.testResults;

const profileTestResult = createSelector([selector], (state) => state.profileTestResult);

export default {
  profileTestResult
};
