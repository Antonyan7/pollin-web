import API from '@axios/API';
import { AppDispatch } from 'redux/store';

import slice from './slice';

const { setServiceProviders, setError, setDate, setAppointments, setCurrentServiceProviderId } = slice.actions;

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

export default { getServiceProviders, setDateValue, getAppointments, applyResource };
