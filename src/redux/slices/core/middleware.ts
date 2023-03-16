import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';

import { DateUtil } from '@utils/date/DateUtil';

import slice from './slice';

const { setClinicConfig } = slice.actions;

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

export default {
  getClinicConfig
};
