import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';

import slice from './slice';

const { setClinicConfig } = slice.actions;

export const getClinicConfig = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.core.getClinicConfig();

    dispatch(setClinicConfig(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  }
};

export default {
  getClinicConfig
};
