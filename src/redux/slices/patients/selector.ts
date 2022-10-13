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
const encountersList = createSelector([selector], (state) => state.encounters.list);
const encountersTypes = createSelector([selector], (state) => state.encounters.types);
const isEncountersListLoading = createSelector([selector], (state) => state.isEncountersListLoading);
const isEncountersFiltersLoading = createSelector([selector], (state) => state.isEncountersFiltersLoading);
const encounterFilters = createSelector([selector], (state) => state.encounters.filters);
const currentPatientId = createSelector([selector], (state) => state.patientsList.currentPatientId);
const encounterDetails = createSelector([selector], (state) => state.encounters.encounterDetails);
const isEncountersAddendumLoading = createSelector([selector], (state) => state.isEncountersAddendumLoading);
const patientProfile = createSelector([selector], (state) => state.patientProfile);
const patientHighlights = createSelector([selector], (state) => state.patientHighlights);

export default {
  patientsListData,
  patientsList,
  isPatientsFiltersLoading,
  isPatientsListLoading,
  patientsErrors,
  filtersList,
  patientAlertDetails,
  encountersList,
  encounterFilters,
  isEncountersListLoading,
  encountersTypes,
  currentPatientId,
  patientProfile,
  patientHighlights,
  encounterDetails,
  isEncountersAddendumLoading,
  isEncountersFiltersLoading
};
