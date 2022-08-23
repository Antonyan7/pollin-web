import API from '@axios/API';
import { AppDispatch } from 'redux/store';
import { AppointmentDetailsProps, CreateAppointmentProps } from 'types/reduxTypes/booking';

import slice from './slice';

const {
  setServiceProviders,
  setError,
  setDate,
  setAppointments,
  setCurrentServiceProviderId,
  setPatientNames,
  setServiceTypes,
  setAppointmentDetails,
  updateAppointment
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
    const response = await API.booking.getAppointments({ resourceId, date });

    dispatch(setAppointments(response.data.data.slots));
  } catch (error) {
    dispatch(setError(error));
  }
};

const setDateValue = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setDate(value));
};

const applyResource = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentServiceProviderId(value));
};

const getPatientNames =
  (name: string = 'exPatientName') =>
  async (dispatch: AppDispatch) => {
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

const createAppointment = (appointmentValues: CreateAppointmentProps) => async (dispatch: AppDispatch) => {
  try {
    await API.booking.makeAppointment(appointmentValues);
  } catch (error) {
    dispatch(setError(error));
  }
};

const getAppointmentDetails =
  (appointmentId: string = 'exAppointmentId') =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await API.booking.takeAppointmentDetails(appointmentId);

      dispatch(setAppointmentDetails(response.data.data.appointment));
    } catch (error) {
      dispatch(setError(error));
    }
  };

const updateAppointmentDetails = (appointmentValues: AppointmentDetailsProps) => async (dispatch: AppDispatch) => {
  try {
    await API.booking.reformAppointmentValues(appointmentValues);
    dispatch(updateAppointment(appointmentValues));
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
  updateAppointmentDetails
};
