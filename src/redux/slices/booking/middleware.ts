import API from '@axios/API';
import { ICreatedAppointmentBody, IEditAppointmentBody } from '@axios/managerBooking';
import store, { AppDispatch } from 'redux/store';

import { toIsoString } from '@utils/dateUtils';

import slice from './slice';

const {
  setServiceProviders,
  setError,
  setDate,
  setAppointments,
  setCurrentServiceProviderId,
  setCalendarLoadingState,
  setPatientNames,
  setServiceTypes,
  setAppointmentDetails
} = slice.actions;

const getServiceProviders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceProviders();

    dispatch(setServiceProviders(response.data.data.providers));
  } catch (error) {
    dispatch(setError(error));
  }
};

const getAppointments = (resourceId: string, date: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCalendarLoadingState(true));

    const response = await API.booking.getAppointments({ resourceId, date });

    dispatch(setAppointments(response.data.data.slots));
    dispatch(setCalendarLoadingState(false));
  } catch (error) {
    dispatch(setCalendarLoadingState(false));
    dispatch(setError(error));
  }
};

const setDateValue = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setDate(value));
};

const applyResource = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentServiceProviderId(value));
};

const getPatientNames = (name: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getPatientNames(name);

    dispatch(setPatientNames(response.data.data.patients));
  } catch (error) {
    dispatch(setError(error));
  }
};

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    dispatch(setServiceTypes(response.data.data.serviceTypes));
  } catch (error) {
    dispatch(setError(error));
  }
};

const createAppointment = (appointmentValues: ICreatedAppointmentBody) => async (dispatch: AppDispatch) => {
  try {
    const providerId = store.getState().booking.currentServiceProviderId;

    appointmentValues.providerId = providerId;
    appointmentValues.date = toIsoString(appointmentValues.date as Date);
    await API.booking.createAppointment(appointmentValues);
  } catch (error) {
    dispatch(setError(error));
  }
};

const getAppointmentDetails = (appointmentId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getAppointmentDetails(appointmentId);

    dispatch(setAppointmentDetails(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

const clearAppointmentDetails = () => (dispatch: AppDispatch) => {
  dispatch(setAppointmentDetails(null));
};

const editAppointment =
  (appointmentId: string, appointmentValues: IEditAppointmentBody) => async (dispatch: AppDispatch) => {
    try {
      await API.booking.editAppointment(appointmentId, appointmentValues);
    } catch (error) {
      dispatch(setError(error));
    }
  };

export default {
  getServiceProviders,
  setDateValue,
  getAppointments,
  applyResource,
  getPatientNames,
  getServiceTypes,
  createAppointment,
  getAppointmentDetails,
  editAppointment,
  clearAppointmentDetails
};
