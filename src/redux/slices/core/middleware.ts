import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';

import { DateUtil } from '@utils/date/DateUtil';

import slice from './slice';

const { setClinicConfig, setFirebaseInitializationStatus, setFeatureFlagsReadyStatus } = slice.actions;

export const getClinicConfig = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.core.getClinicConfig();
    const clinicConfig = response.data.data;

    DateUtil.initialize(clinicConfig.timeZone);
    dispatch(setClinicConfig(clinicConfig));
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const updateFirebaseInitializationStatus = (status: boolean) => (dispatch: AppDispatch) => {
  dispatch(setFirebaseInitializationStatus(status));
};

export const updateFeatureFlagsReadyStatus = (status: boolean) => (dispatch: AppDispatch) => {
  dispatch(setFeatureFlagsReadyStatus(status));
};

export default {
  getClinicConfig,
  updateFirebaseInitializationStatus,
  updateFeatureFlagsReadyStatus
};
