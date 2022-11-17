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
const currentEncounterId = createSelector([selector], (state) => state.patientsList.currentEncounterId);
const encounterDetails = createSelector([selector], (state) => state.encounters.encounterDetails);
const isEncountersAddendumLoading = createSelector([selector], (state) => state.isEncountersAddendumLoading);
const patientProfile = createSelector([selector], (state) => state.patientProfile);
const patientHighlights = createSelector([selector], (state) => state.patientHighlights);
const latestTestResults = createSelector([selector], (state) => state.latestTestResults);
const patientProfileOverview = createSelector([selector], (state) => state.profile.overview);
const isPatientProfileOverviewLoading = createSelector([selector], (state) => state.profile.isOverviewLoading);
const testResultsHistory = createSelector([selector], (state) => state.profile.testResultsHistory);
const isTestResultsHistoryLoading = createSelector([selector], (state) => state.profile.isTestResultsHistoryLoading);
const profileTestResults = createSelector([selector], (state) => state.profile.profileTestResults);
const isProfileTestResultsLoading = createSelector([selector], (state) => state.profile.isProfileTestResultsLoading);
const patientAppointments = createSelector([selector], (state) => state.patientAppointments);
const isEncountersDetailsLoading = createSelector([selector], (state) => state.isEncountersDetailsLoading);
const currentPatientAppointmentFilterField = createSelector(
  [selector],
  (state) => state.currentPatientAppointmentFilterField
);
const isCreateEncounterNoteLoading = createSelector([selector], (state) => state.isCreateEncounterNoteLoading);
const isUpdateEncounterNoteLoading = createSelector([selector], (state) => state.isUpdateEncounterNoteLoading);
const isUpdateEncounterAddendumLoading = createSelector([selector], (state) => state.isUpdateEncounterAddendumLoading);
const isCreateEncounterAddendumLoading = createSelector([selector], (state) => state.isCreateEncounterAddendumLoading);

export default {
  isTestResultsHistoryLoading,
  isProfileTestResultsLoading,
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
  isEncountersFiltersLoading,
  currentEncounterId,
  latestTestResults,
  isPatientProfileOverviewLoading,
  patientProfileOverview,
  testResultsHistory,
  patientAppointments,
  isEncountersDetailsLoading,
  profileTestResults,
  currentPatientAppointmentFilterField,
  isCreateEncounterNoteLoading,
  isUpdateEncounterNoteLoading,
  isUpdateEncounterAddendumLoading,
  isCreateEncounterAddendumLoading
};
