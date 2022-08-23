import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.booking;

export const appointmentsList = createSelector([selector], (state) => state.appointments);
export const serviceProvidersList = createSelector([selector], (state) => state.serviceProviders);
export const calendarDate = createSelector([selector], (state) => state.date);
export const serviceProviderId = createSelector([selector], (state) => state.currentServiceProviderId);

export default {
  appointmentsList,
  serviceProvidersList,
  calendarDate,
  serviceProviderId
};
