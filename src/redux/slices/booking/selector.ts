import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.booking;

export const appointmentsList = createSelector([selector], (state) => state.appointments);
export const serviceProvidersList = createSelector([selector], (state) => state.serviceProviders);
export const groupedServiceProvidersList = createSelector([selector], (state) => state.groupedServiceProviders);
export const specimenGroupedServiceProvidersList = createSelector(
  [selector],
  (state) => state.specimenGroupedServiceProviders
);
export const calendarDate = createSelector([selector], (state) => state.date);
export const specimenCollectionCalendarDate = createSelector([selector], (state) => state.specimenAppointments.date);
export const isBookingCalendarLoading = createSelector([selector], (state) => state.isBookingCalendarLoading);
export const isCollectionCalendarLoading = createSelector([selector], (state) => state.isCollectionCalendarLoading);
export const serviceProviderId = createSelector([selector], (state) => state.currentServiceProviderId);
export const specimenServiceProviderId = createSelector([selector], (state) => state.currentSpecimenServiceProviderId);
export const patientList = createSelector([selector], (state) => state.patientList);
export const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
export const appointmentDetails = createSelector([selector], (state) => state.appointmentDetails);
export const patientAlerts = createSelector([selector], (state) => state.patientAlerts);
export const isServiceProvidersLoading = createSelector([selector], (state) => state.isServiceProvidersLoading);
export const isGroupedServiceProvidersLoading = createSelector(
  [selector],
  (state) => state.isGroupedServiceProvidersLoading
);
export const isSpecimenGroupedServiceProvidersLoading = createSelector(
  [selector],
  (state) => state.isSpecimenGroupedServiceProvidersLoading
);
export const isAppointmentLoading = createSelector([selector], (state) => state.isAppointmentLoading);
export const isSaveButtonDisabled = createSelector([selector], (state) => state.isSaveButtonDisabled);
export const isServiceTypesLoading = createSelector([selector], (state) => state.isServiceTypesLoading);
export const appointmentStatus = createSelector([selector], (state) => state.appointmentStatus);
export const createAppointmentErrorState = createSelector([selector], (state) => state.createAppointmentError);
export const editAppointmentErrorState = createSelector([selector], (state) => state.editAppointmentErrorState);
export const cancelAppointmentErrorState = createSelector([selector], (state) => state.cancelAppointmentErrorState);
export const specimenAppointments = createSelector([selector], (state) => state.specimenAppointments);
export const specimenAppointmentsFilters = createSelector([specimenAppointments], (state) => state.filters);
export const checkInAppointmentsList = createSelector([selector], (state) => state.checkInAppointmentsList);
export const isCheckInAppointmentsLoading = createSelector([selector], (state) => state.isCheckInAppointmentsLoading);
export const isCheckInLoading = createSelector([selector], (state) => state.isCheckInLoading);
export const isCheckInSuccess = createSelector([selector], (state) => state.isCheckInSuccess);
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
  isSpecimenGroupedServiceProvidersLoading,
  appointmentsList,
  serviceProvidersList,
  groupedServiceProvidersList,
  specimenGroupedServiceProvidersList,
  calendarDate,
  specimenCollectionCalendarDate,
  serviceProviderId,
  specimenServiceProviderId,
  isBookingCalendarLoading,
  isCollectionCalendarLoading,
  patientList,
  isCheckInLoading,
  isCheckInSuccess,
  serviceTypes,
  appointmentDetails,
  patientAlerts,
  isAppointmentLoading,
  isSaveButtonDisabled,
  appointmentStatus,
  createAppointmentErrorState,
  cancelAppointmentErrorState,
  editAppointmentErrorState,
  specimenAppointments,
  specimenAppointmentsFilters,
  selectedSpecimenAppointmentsFilters,
  checkInAppointmentsList,
  isCheckInAppointmentsLoading,
  isSpecimenAppointmentsFiltersArrayLoading,
  specimenAppointmentsList
};
