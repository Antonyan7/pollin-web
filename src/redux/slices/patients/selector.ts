import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.patients;

const patientsList = createSelector([selector], (state) => state.patientsList);
const patientsErrors = createSelector([selector], (state) => state.error);
const patientAlertDetails = createSelector([selector], (state) => state.patientAlertDetails);

export default {
  patientsList,
  patientsErrors,
  patientAlertDetails
};
