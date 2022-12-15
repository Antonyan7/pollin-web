import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.booking;

export const appointmentsList = createSelector([selector], (state) => state.appointments);
export const serviceProvidersList = createSelector([selector], (state) => state.serviceProviders);
export const groupedServiceProvidersList = createSelector([selector], (state) => state.groupedServiceProviders);
export const calendarDate = createSelector([selector], (state) => state.date);
export const isCalendarLoading = createSelector([selector], (state) => state.isCalendarLoading);
export const serviceProviderId = createSelector([selector], (state) => state.currentServiceProviderId);
export const patientList = createSelector([selector], (state) => state.patientList);
export const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
export const appointmentDetails = createSelector([selector], (state) => state.appointmentDetails);
export const patientAlerts = createSelector([selector], (state) => state.patientAlerts);
export const isServiceProvidersLoading = createSelector([selector], (state) => state.isServiceProvidersLoading);
export const isGroupedServiceProvidersLoading = createSelector(
  [selector],
  (state) => state.isGroupedServiceProvidersLoading
);
export const isAppointmentLoading = createSelector([selector], (state) => state.isAppointmentLoading);
export const isSaveButtonDisabled = createSelector([selector], (state) => state.isSaveButtonDisabled);
export const isServiceTypesLoading = createSelector([selector], (state) => state.isServiceTypesLoading);
export const appointmentStatus = createSelector([selector], (state) => state.appointmentStatus);
export const createAppointmentErrorState = createSelector([selector], (state) => state.createAppointmentError);
export const editAppointmentErrorState = createSelector([selector], (state) => state.editAppointmentErrorState);
export const cancellAppointmentErrorState = createSelector([selector], (state) => state.cancelAppointmentErrorState);
export const specimenAppointments = createSelector([selector], (state) => state.specimenAppointments);
export const specimenAppointmentsFilters = createSelector([specimenAppointments], (state) => state.filters);
export const selectedSpecimenAppointmentsFilters = createSelector(
  [specimenAppointments],
  (state) => state.selectedFilters
);
export const isSpecimenAppointmentsFiltersArrayLoading = createSelector(
  [specimenAppointments],
  (state) => state.isFiltersArrayLoading
);

export const specimenAppointmentsList = createSelector([specimenAppointments], (state) => state.list);

export default {
  isServiceTypesLoading,
  isServiceProvidersLoading,
  isGroupedServiceProvidersLoading,
  appointmentsList,
  serviceProvidersList,
  groupedServiceProvidersList,
  calendarDate,
  serviceProviderId,
  isCalendarLoading,
  patientList,
  serviceTypes,
  appointmentDetails,
  patientAlerts,
  isAppointmentLoading,
  isSaveButtonDisabled,
  appointmentStatus,
  createAppointmentErrorState,
  cancellAppointmentErrorState,
  editAppointmentErrorState,
  specimenAppointments,
  specimenAppointmentsFilters,
  selectedSpecimenAppointmentsFilters,
  isSpecimenAppointmentsFiltersArrayLoading,
  specimenAppointmentsList
};
