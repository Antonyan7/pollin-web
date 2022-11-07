import API from '@axios/API';
import {
  ICreatedAppointmentBody,
  IEditAppointmentBody,
  IServiceTypesReqParams
} from '@axios/booking/managerBookingTypes';
import { IGetPatientsRequestBody } from '@axios/patientEmr/managerPatientEmrTypes';
import * as Sentry from '@sentry/nextjs';
import store, { AppDispatch } from 'redux/store';
import { IServiceProviders } from 'types/reduxTypes/bookingStateTypes';

import { calculateTimeInUTC, toLocalIsoString } from '@utils/dateUtils';
import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import slice from './slice';

const {
  updateServiceProviders,
  setIsServiceProvidersLoading,
  setServiceProviders,
  setError,
  setDate,
  setAppointments,
  setCurrentServiceProviderId,
  setCalendarLoadingState,
  setPatientsList,
  setPatientListLoading,
  setIsServiceTypesLoading,
  updatePatientsList,
  setServiceTypes,
  setAppointmentDetails,
  setPatientAlerts,
  setAppointmentLoading,
  setSaveButtonDisabled,
  setAppointmentStatus
} = slice.actions;

const resetPatientData = (dispatch: AppDispatch) => {
  dispatch(
    setPatientsList({
      patients: [],
      isLoading: false,
      currentPage: 0,
      totalItems: 0,
      pageSize: 0
    })
  );
};

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
    dispatch(setError(error as string));
  }
};

const getNewServiceProviders = (page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsServiceProvidersLoading(true));

    const response = await API.booking.getServiceProviders({ page });
    const data: IServiceProviders = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      providers: response.data.data.providers
    };

    dispatch(updateServiceProviders(data));
    dispatch(setIsServiceProvidersLoading(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
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
    dispatch(setError(error as string));
  }
};

const setDateValue = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setDate(value));
};

const setEditSaveButtonDisabled = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(setSaveButtonDisabled(value));
};

const applyResource = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentServiceProviderId(value));
};

const getPatients = (patientsListData: IGetPatientsRequestBody | null) => async (dispatch: AppDispatch) => {
  if (!patientsListData) {
    resetPatientData(dispatch);

    return;
  }

  try {
    dispatch(setPatientListLoading(true));

    const response = await API.patients.getPatients(patientsListData);

    dispatch(
      setPatientsList({
        patients: response.data.data.patients,
        isLoading: false,
        currentPage: response.data.currentPage,
        totalItems: response.data.totalItems,
        pageSize: response.data.pageSize
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    resetPatientData(dispatch);
    dispatch(setPatientListLoading(false));
    dispatch(setError(error as string));
  }
};

const getNewPatients = (patientsListData: IGetPatientsRequestBody | null) => async (dispatch: AppDispatch) => {
  if (!patientsListData) {
    resetPatientData(dispatch);

    return;
  }

  try {
    dispatch(setPatientListLoading(true));

    const response = await API.patients.getPatients(patientsListData);

    dispatch(
      updatePatientsList({
        patients: response.data.data.patients,
        isLoading: false,
        currentPage: response.data.currentPage,
        totalItems: response.data.totalItems,
        pageSize: response.data.pageSize
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    resetPatientData(dispatch);
    dispatch(setPatientListLoading(false));
    dispatch(setError(error as string));
  }
};

const getServiceTypes = (params?: IServiceTypesReqParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsServiceTypesLoading(true));

    const response = await API.booking.getServiceTypes(params);
    const serviceTypes = sortServiceTypesByAlphabeticOrder(response.data.data.serviceTypes);

    dispatch(setServiceTypes(serviceTypes));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  } finally {
    dispatch(setIsServiceTypesLoading(false));
  }
};

const resetAppointmentStatus = () => async (dispatch: AppDispatch) => {
  const resetOption = {
    success: false,
    fail: false
  };

  dispatch(
    setAppointmentStatus({
      create: resetOption,
      edit: resetOption,
      cancel: resetOption
    })
  );
};

const createAppointment = (appointmentValues: ICreatedAppointmentBody) => async (dispatch: AppDispatch) => {
  try {
    const providerId = store.getState().booking.currentServiceProviderId;
    const calendarDate = store.getState().booking.date;
    const { appointmentStatus } = store.getState().booking;

    dispatch(setAppointmentLoading(true));

    appointmentValues.providerId = providerId;
    appointmentValues.date = calculateTimeInUTC(toLocalIsoString(appointmentValues.date as Date));
    await API.booking.createAppointment(appointmentValues);
    dispatch(
      setAppointmentStatus({
        ...appointmentStatus,
        create: {
          fail: false,
          success: true
        }
      })
    );
    dispatch(getAppointments(providerId, calendarDate));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};

const getAppointmentDetails = (appointmentId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getAppointmentDetails(appointmentId);

    dispatch(setAppointmentDetails(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  }
};

const clearAppointmentDetails = () => (dispatch: AppDispatch) => {
  dispatch(setAppointmentDetails(null));
};

const editAppointment =
  (appointmentId: string, appointmentValues: IEditAppointmentBody) => async (dispatch: AppDispatch) => {
    try {
      const providerId = store.getState().booking.currentServiceProviderId;
      const calendarDate = store.getState().booking.date;
      const { appointmentStatus } = store.getState().booking;

      appointmentValues.appointment.date = calculateTimeInUTC(
        toLocalIsoString(appointmentValues.appointment.date as Date)
      );
      await API.booking.editAppointment(appointmentId, appointmentValues);
      dispatch(
        setAppointmentStatus({
          ...appointmentStatus,
          edit: {
            fail: false,
            success: true
          }
        })
      );
      dispatch(getAppointments(providerId, calendarDate));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error as string));
    }
  };

const getPatientAlerts = (patientId?: string) => async (dispatch: AppDispatch) => {
  try {
    if (patientId) {
      const response = await API.patients.getPatientAlertDetails(patientId);

      dispatch(setPatientAlerts(response.data.data.alerts ?? []));
    } else {
      dispatch(setPatientAlerts([]));
    }
  } catch (error) {
    dispatch(setPatientAlerts([]));
  }
};

const cancelAppointment = (appointmentId: string, cancellationReason: string) => async (dispatch: AppDispatch) => {
  try {
    const providerId = store.getState().booking.currentServiceProviderId;
    const calendarDate = store.getState().booking.date;
    const { appointmentStatus } = store.getState().booking;

    dispatch(setAppointmentLoading(true));
    await API.booking.cancelAppointment(appointmentId, {
      appointment: {
        cancellationReason
      }
    });
    dispatch(setAppointmentLoading(false));
    dispatch(
      setAppointmentStatus({
        ...appointmentStatus,
        cancel: {
          fail: false,
          success: true
        }
      })
    );
    dispatch(getAppointments(providerId, calendarDate));
  } catch (error) {
    dispatch(setError(error as string));
  }
};

export default {
  getNewServiceProviders,
  getServiceProviders,
  setDateValue,
  getAppointments,
  cancelAppointment,
  applyResource,
  getPatients,
  getNewPatients,
  getServiceTypes,
  createAppointment,
  getAppointmentDetails,
  editAppointment,
  clearAppointmentDetails,
  getPatientAlerts,
  setEditSaveButtonDisabled,
  resetAppointmentStatus
};
