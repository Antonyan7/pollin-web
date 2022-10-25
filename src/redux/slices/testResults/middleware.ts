import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';

import slice from './slice';

const { setError, setProfileTestResult } = slice.actions;

const getProfileTestResultLatest = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.testResults.getProfileTestResultLatest(patientId);

    dispatch(setProfileTestResult(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  }
};

export default {
  getProfileTestResultLatest
};
