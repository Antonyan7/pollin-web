import API from '@axios/API';
import { ICreatedAppointmentBody, IEditAppointmentBody } from '@axios/managerBooking';
import { IGetPatientsRequestBody } from '@axios/managerPatientEmr';
import * as Sentry from '@sentry/nextjs';
import store, { AppDispatch } from 'redux/store';
import { IServiceProviders } from 'types/reduxTypes/booking';

import { toIsoString } from '@utils/dateUtils';

import slice from './slice';

const {
  setServiceProviders,
  setError,
  setDate,
  setAppointments,
  setCurrentServiceProviderId,
  setCalendarLoadingState,
  setPatientsList,
  setServiceTypes,
  setAppointmentDetails,
  setPatientAlerts
} = slice.actions;

const getServiceProviders = (page: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceProviders({ page });
    const data: IServiceProviders = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      providers: response.data.data.providers
    };

    dispatch(setServiceProviders(data));
  } catch (error) {
    Sentry.captureException(error);
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
    dispatch(setAppointments([]));
    dispatch(setCalendarLoadingState(false));
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const setDateValue = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setDate(value));
};

const applyResource = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentServiceProviderId(value));
};

const getPatients = (patientsListData: IGetPatientsRequestBody | null) => async (dispatch: AppDispatch) => {
  if (!patientsListData) {
    dispatch(
      setPatientsList({
        patients: [],
        currentPage: 0,
        totalItems: 0,
        pageSize: 0
      })
    );

    return;
  }

  try {
    const response = await API.patients.getPatients(patientsListData);

    dispatch(setPatientsList(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(
      setPatientsList({
        patients: [],
        currentPage: 0,
        totalItems: 0,
        pageSize: 0
      })
    );
    dispatch(setError(error));
  }
};

const getServiceTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getServiceTypes();

    dispatch(setServiceTypes(response.data.data.serviceTypes));
  } catch (error) {
    Sentry.captureException(error);
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
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getAppointmentDetails = (appointmentId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getAppointmentDetails(appointmentId);

    dispatch(setAppointmentDetails(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
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
      Sentry.captureException(error);
      dispatch(setError(error));
    }
  };

const getPatientAlerts = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    if (patientId) {
      const response = await API.patients.getPatientAlertDetails(patientId);

      dispatch(setPatientAlerts(response.data.data));
    } else {
      dispatch(setPatientAlerts([]));
    }
  } catch (error) {
    dispatch(setPatientAlerts([]));
  }
};

const cancelAppointment = (appointmentId: string, cancellationReason: string) => async (dispatch: AppDispatch) => {
  try {
    await API.booking.cancelAppointment(appointmentId, {
      appointment: {
        cancellationReason
      }
    });
  } catch (error) {
    dispatch(setError(error));
  }
};

export default {
  getServiceProviders,
  setDateValue,
  getAppointments,
  cancelAppointment,
  applyResource,
  getPatients,
  getServiceTypes,
  createAppointment,
  getAppointmentDetails,
  editAppointment,
  clearAppointmentDetails,
  getPatientAlerts
};
