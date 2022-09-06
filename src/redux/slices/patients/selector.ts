import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.patients;

const patientsList = createSelector([selector], (state) => state.patientsList);
const patientsErrors = createSelector([selector], (state) => state.error);

export default {
  patientsList,
  patientsErrors
};
