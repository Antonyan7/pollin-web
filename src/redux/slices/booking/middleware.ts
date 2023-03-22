import API from '@axios/API';
import {
  ICheckInReqBody,
  ICreateAppointmentBody,
  IEditAppointmentBody,
  IGroupedServiceProvidersParams,
  IServiceTypesReqParams,
  ProvidersCollectionCalendarAppointmentsReqBodyFilter
} from '@axios/booking/managerBookingTypes';
import { IGetPatientsRequestBody } from '@axios/patientEmr/managerPatientEmrTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { viewsMiddleware } from '@redux/slices/views';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import store, { AppDispatch } from 'redux/store';
import {
  IAppointmentErrorState,
  IGroupedServiceProviders,
  IServiceProviders
} from 'types/reduxTypes/bookingStateTypes';

import { DateUtil } from '@utils/date/DateUtil';
import { calculateTimeInUTC, convertToLocale, toLocalIsoString } from '@utils/dateUtils';
import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import slice from './slice';

const {
  updateServiceProviders,
  updateGroupedServiceProviders,
  updateSpecimenGroupedServiceProviders,
  setIsServiceProvidersLoading,
  setIsGroupedServiceProvidersLoading,
  setServiceProviders,
  setGroupedServiceProviders,
  setSpecimenGroupedServiceProviders,
  setError,
  setDate,
  setCollectionCalendarDate,
  setBookingAppointments,
  setCurrentServiceProviderId,
  setCurrentSpecimenServiceProviderId,
  setBookingCalendarLoadingState,
  setCollectionCalendarLoadingState,
  setIsCheckInAppointmentsLoading,
  setCheckInAppointments,
  setPatientsList,
  setPatientListLoading,
  setIsServiceTypesLoading,
  updatePatientsList,
  setServiceTypes,
  setAppointmentDetails,
  setPatientAlerts,
  setAppointmentLoading,
  setIsRefreshCheckInAppointments,
  setIsCheckInLoading,
  setIsCheckInSuccess,
  setSaveButtonDisabled,
  setAppointmentStatus,
  setCreateAppointmentErrorState,
  setEditAppointmentErrorState,
  setCancelAppointmentErrorState,
  setSpecimenAppointmentsFilters,
  setSpecimenAppointmentsFiltersArrayLoading,
  setSpecimenAppointments,
  setIsSpecimenGroupedServiceProvidersLoading
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
    dispatch(setIsServiceProvidersLoading(true));

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
  } finally {
    dispatch(setIsServiceProvidersLoading(false));
  }
};

const getGroupedServiceProviders =
  (serviceProvidersData: IGroupedServiceProvidersParams, isSpecimenCollection = false) =>
  async (dispatch: AppDispatch) => {
    try {
      serviceProvidersData.specimenCollection = isSpecimenCollection;

      dispatch(
        isSpecimenCollection
          ? setIsSpecimenGroupedServiceProvidersLoading(true)
          : setIsGroupedServiceProvidersLoading(true)
      );

      const response = await API.booking.getGroupedServiceProviders(serviceProvidersData);

      const data: IGroupedServiceProviders = {
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage,
        pageSize: response.data.pageSize,
        providers: response.data.data.providers,
        ...(serviceProvidersData.searchString !== undefined ? { searchString: serviceProvidersData.searchString } : {})
      };

      dispatch(isSpecimenCollection ? setSpecimenGroupedServiceProviders(data) : setGroupedServiceProviders(data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error as string));
    } finally {
      dispatch(setIsGroupedServiceProvidersLoading(false));
      dispatch(setIsSpecimenGroupedServiceProvidersLoading(false));
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
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  } finally {
    dispatch(setIsServiceProvidersLoading(false));
  }
};

const getNewGroupedServiceProviders =
  (serviceProvidersData: IGroupedServiceProvidersParams, isSpecimenCollection = false) =>
  async (dispatch: AppDispatch) => {
    try {
      serviceProvidersData.specimenCollection = isSpecimenCollection;

      dispatch(
        isSpecimenCollection
          ? setIsSpecimenGroupedServiceProvidersLoading(true)
          : setIsGroupedServiceProvidersLoading(true)
      );

      const response = await API.booking.getGroupedServiceProviders(serviceProvidersData);
      const data: IGroupedServiceProviders = {
        totalItems: response.data.totalItems,
        currentPage: response.data.currentPage,
        pageSize: response.data.pageSize,
        providers: response.data.data.providers,
        ...(serviceProvidersData.searchString !== undefined ? { searchString: serviceProvidersData.searchString } : {})
      };

      dispatch(
        isSpecimenCollection ? updateSpecimenGroupedServiceProviders(data) : updateGroupedServiceProviders(data)
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error as string));
    } finally {
      dispatch(setIsGroupedServiceProvidersLoading(false));
      dispatch(setIsSpecimenGroupedServiceProvidersLoading(false));
    }
  };

const getBookingAppointments = (resourceId: string, date: Date) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setBookingCalendarLoadingState(true));

    const response = await API.booking.getAppointments({ resourceId, date: DateUtil.convertToDateOnly(date) });

    dispatch(setBookingAppointments(response.data.data.slots));
    dispatch(setBookingCalendarLoadingState(false));
  } catch (error) {
    dispatch(setBookingAppointments([]));
    dispatch(setBookingCalendarLoadingState(false));
    Sentry.captureException(error);
    dispatch(setError(error as string));
  }
};

const clearBookingCalendarAppointments = () => (dispatch: AppDispatch) => {
  dispatch(setBookingAppointments([]));
};
const clearCollectionCalendarAppointments = () => (dispatch: AppDispatch) => {
  dispatch(setSpecimenAppointments([]));
};

const setDateValue = (value: Date) => (dispatch: AppDispatch) => {
  dispatch(setDate(value));
};

const updateCollectionCalendarDate = (value: Date) => (dispatch: AppDispatch) => {
  dispatch(setCollectionCalendarDate(value));
};

const setEditSaveButtonDisabled = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(setSaveButtonDisabled(value));
};

const updateBookingResourceId = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentServiceProviderId(value));
};
const updateSpecimenResourceId = (value: string) => (dispatch: AppDispatch) => {
  dispatch(setCurrentSpecimenServiceProviderId(value));
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

const getCheckInAppointments = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCheckInAppointmentsLoading(true));

    const response = await API.booking.getCheckInAppointments(patientId);

    dispatch(setCheckInAppointments(response.data.data.appointments));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
  } finally {
    dispatch(setIsCheckInAppointmentsLoading(false));
  }
};

const refreshCheckInAppointments = (isRefresh: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsRefreshCheckInAppointments(isRefresh));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error as string));
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

const checkInAppointment = (checkInValues: ICheckInReqBody, message: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCheckInLoading(true));

    await API.booking.checkInAppointment(checkInValues);
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: message
        }
      })
    );
    dispatch(getCheckInAppointments(checkInValues.patientId));
    dispatch(setIsCheckInSuccess(true));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setIsCheckInSuccess(false));
    dispatch(setError(error as string));
  } finally {
    dispatch(setIsCheckInLoading(false));
  }
};

const clearCreateAppointmentErrorState = () => async (dispatch: AppDispatch) => {
  dispatch(
    setCreateAppointmentErrorState({
      message: '',
      code: ''
    })
  );
};

const createAppointment = (appointmentValues: ICreateAppointmentBody) => async (dispatch: AppDispatch) => {
  const { appointmentStatus } = store.getState().booking;

  try {
    const providerId = appointmentValues.providerId
      ? appointmentValues.providerId
      : store.getState().booking.currentServiceProviderId;

    const calendarDate = store.getState().booking.date;

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
    dispatch(getBookingAppointments(providerId, calendarDate));
  } catch (error) {
    Sentry.captureException(error);

    if (axios.isAxiosError(error)) {
      dispatch(setCreateAppointmentErrorState(error?.response?.data.status as IAppointmentErrorState));
      dispatch(
        setAppointmentStatus({
          ...appointmentStatus,
          create: {
            fail: true,
            success: false
          }
        })
      );
    }
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};

const getAppointmentDetails = (appointmentId?: string) => async (dispatch: AppDispatch) => {
  try {
    if (appointmentId) {
      const response = await API.booking.getAppointmentDetails(appointmentId);

      dispatch(setAppointmentDetails(response.data.data));
    } else {
      dispatch(setAppointmentDetails(null));
    }
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
    const { appointmentStatus } = store.getState().booking;

    try {
      const providerId = store.getState().booking.currentServiceProviderId;
      const calendarDate = store.getState().booking.date;

      appointmentValues.appointment.date = calculateTimeInUTC(
        convertToLocale(appointmentValues.appointment.date as string)
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
      dispatch(getBookingAppointments(providerId, calendarDate));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error as string));

      if (axios.isAxiosError(error)) {
        dispatch(setEditAppointmentErrorState(error?.response?.data.status as IAppointmentErrorState));

        dispatch(
          setAppointmentStatus({
            ...appointmentStatus,
            edit: {
              fail: true,
              success: false
            }
          })
        );
      }
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
  const { appointmentStatus } = store.getState().booking;

  try {
    const providerId = store.getState().booking.currentServiceProviderId;
    const calendarDate = store.getState().booking.date;

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
    dispatch(getBookingAppointments(providerId, calendarDate));
  } catch (error) {
    Sentry.captureException(error);

    if (axios.isAxiosError(error)) {
      dispatch(setCancelAppointmentErrorState(error?.response?.data.status as IAppointmentErrorState));

      dispatch(
        setAppointmentStatus({
          ...appointmentStatus,
          cancel: {
            fail: true,
            success: false
          }
        })
      );
    }
  }
};

const getSpecimenAppointmentsFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSpecimenAppointmentsFiltersArrayLoading(true));

    const { data } = await API.booking.getCollectionCalendarAppointmentFilters();

    dispatch(setSpecimenAppointmentsFilters(data.filters));
  } catch (error) {
    dispatch(setError(error as string));
  } finally {
    dispatch(setSpecimenAppointmentsFiltersArrayLoading(false));
  }
};

const getSpecimenAppointments =
  (resourceId: string, date: Date, filters: ProvidersCollectionCalendarAppointmentsReqBodyFilter[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setCollectionCalendarLoadingState(true));

      const response = await API.booking.getProvidersCollectionCalendarAppointments({
        resourceId,
        date: DateUtil.convertToDateOnly(date),
        filters
      });

      dispatch(setSpecimenAppointments(response.data.appointments));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setCollectionCalendarLoadingState(false));
      dispatch(setSpecimenAppointments([]));
      dispatch(setError(error as string));
    } finally {
      dispatch(setCollectionCalendarLoadingState(false));
    }
  };

const clearSpecimenAppointments = () => (dispatch: AppDispatch) => {
  dispatch(setSpecimenAppointments([]));
};

export default {
  getNewServiceProviders,
  getNewGroupedServiceProviders,
  getServiceProviders,
  getGroupedServiceProviders,
  setDateValue,
  updateCollectionCalendarDate,
  getBookingAppointments,
  clearBookingCalendarAppointments,
  clearCollectionCalendarAppointments,
  cancelAppointment,
  updateBookingResourceId,
  updateSpecimenResourceId,
  getPatients,
  getNewPatients,
  refreshCheckInAppointments,
  getServiceTypes,
  createAppointment,
  getAppointmentDetails,
  checkInAppointment,
  editAppointment,
  clearAppointmentDetails,
  getPatientAlerts,
  setEditSaveButtonDisabled,
  getCheckInAppointments,
  resetAppointmentStatus,
  clearCreateAppointmentErrorState,
  getSpecimenAppointmentsFilters,
  getSpecimenAppointments,
  clearSpecimenAppointments
};
