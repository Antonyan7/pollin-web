import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.core;

const clinicConfigs = createSelector([selector], (state) => state.clinicConfig);
const initializationStatus = createSelector([selector], (state) => state.initializationStatus);

export default {
  clinicConfigs,
  initializationStatus
};
