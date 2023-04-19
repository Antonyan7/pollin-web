import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.booking;

export const appointmentsList = createSelector([selector], (state) => state.appointments);
export const shouldUpdateBookingCalendarAppointments = createSelector(
  [selector],
  (state) => state.shouldUpdateBookingCalendarAppointments
);
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
export const isGroupedServiceProvidersLoading = createSelector(
  [selector],
  (state) => state.isGroupedServiceProvidersLoading
);
export const isSpecimenGroupedServiceProvidersLoading = createSelector(
  [selector],
  (state) => state.isSpecimenGroupedServiceProvidersLoading
);
export const isAppointmentLoading = createSelector([selector], (state) => state.isAppointmentLoading);
export const isAppointmentEditLoading = createSelector([selector], (state) => state.isAppointmentEditLoading);
export const isServiceTypesLoading = createSelector([selector], (state) => state.isServiceTypesLoading);
export const specimenAppointments = createSelector([selector], (state) => state.specimenAppointments);
export const specimenAppointmentsFilters = createSelector([specimenAppointments], (state) => state.filters);
export const checkInAppointmentsList = createSelector([selector], (state) => state.checkInAppointmentsList);
export const isCheckInAppointmentsLoading = createSelector([selector], (state) => state.isCheckInAppointmentsLoading);
export const isRefreshCheckInAppointments = createSelector([selector], (state) => state.isRefreshCheckInAppointments);
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
export const patientProfileAppointmentsGroup = createSelector(
  [selector],
  (state) => state.profilePatientAppointmentsGroups
);

export default {
  isServiceTypesLoading,
  isGroupedServiceProvidersLoading,
  isSpecimenGroupedServiceProvidersLoading,
  appointmentsList,
  shouldUpdateBookingCalendarAppointments,
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
  isAppointmentEditLoading,
  isRefreshCheckInAppointments,
  appointmentDetails,
  patientAlerts,
  isAppointmentLoading,
  specimenAppointments,
  specimenAppointmentsFilters,
  selectedSpecimenAppointmentsFilters,
  checkInAppointmentsList,
  isCheckInAppointmentsLoading,
  isSpecimenAppointmentsFiltersArrayLoading,
  specimenAppointmentsList,
  patientProfileAppointmentsGroup
};
