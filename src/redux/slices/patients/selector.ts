import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.patients;

const patientsListData = createSelector(selector, (state) => state.patientsList);
const patientsList = createSelector([selector], (state) => state.patientsList.list);
const isPatientsListLoading = createSelector([selector], (state) => state.isPatientsListLoading);
const isPatientsFiltersLoading = createSelector([selector], (state) => state.isPatientsFiltersLoading);
const patientsErrors = createSelector([selector], (state) => state.error);
const filtersList = createSelector([selector], (state) => state.patientsList.searchFilters);
const patientAlertDetails = createSelector([selector], (state) => state.patientsList.patientAlertDetails);

export default {
  patientsListData,
  patientsList,
  isPatientsFiltersLoading,
  isPatientsListLoading,
  patientsErrors,
  filtersList,
  patientAlertDetails
};
