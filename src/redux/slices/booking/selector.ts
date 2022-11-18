import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.booking;

export const appointmentsList = createSelector([selector], (state) => state.appointments);
export const serviceProvidersList = createSelector([selector], (state) => state.serviceProviders);
export const calendarDate = createSelector([selector], (state) => state.date);
export const isCalendarLoading = createSelector([selector], (state) => state.isCalendarLoading);
export const serviceProviderId = createSelector([selector], (state) => state.currentServiceProviderId);
export const patientList = createSelector([selector], (state) => state.patientList);
export const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
export const appointmentDetails = createSelector([selector], (state) => state.appointmentDetails);
export const patientAlerts = createSelector([selector], (state) => state.patientAlerts);
export const isServiceProvidersLoading = createSelector([selector], (state) => state.isServiceProvidersLoading);
export const isAppointmentLoading = createSelector([selector], (state) => state.isAppointmentLoading);
export const isSaveButtonDisabled = createSelector([selector], (state) => state.isSaveButtonDisabled);
export const isServiceTypesLoading = createSelector([selector], (state) => state.isServiceTypesLoading);
export const appointmentStatus = createSelector([selector], (state) => state.appointmentStatus);
export const createAppointmentErrorState = createSelector([selector], (state) => state.createAppointmentError);

export default {
  isServiceTypesLoading,
  isServiceProvidersLoading,
  appointmentsList,
  serviceProvidersList,
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
  createAppointmentErrorState
};
