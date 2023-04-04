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
import { bookingMiddleware } from '@redux/slices/booking/index';
import { viewsMiddleware } from '@redux/slices/views';
import * as Sentry from '@sentry/nextjs';
import { t } from 'i18next';
import store, { AppDispatch } from 'redux/store';
import { IGroupedServiceProviders, IServiceProviders } from 'types/reduxTypes/bookingStateTypes';

import { DateUtil } from '@utils/date/DateUtil';
import { sortServiceTypesByAlphabeticOrder } from '@utils/sortUtils';

import { CypressIds } from '../../../constants/cypressIds';
import { Translation } from '../../../constants/translations';
import { ModalName } from '../../../types/modals';

import slice from './slice';

const {
  updateServiceProviders,
  updateGroupedServiceProviders,
  updateSpecimenGroupedServiceProviders,
  setIsServiceProvidersLoading,
  setIsGroupedServiceProvidersLoading,
  setProfileAppointmentsGroup,
  setServiceProviders,
  setGroupedServiceProviders,
  setSpecimenGroupedServiceProviders,
  setDate,
  setBookingAppointments,
  setCurrentServiceProviderId,
  setCurrentSpecimenServiceProviderId,
  setBookingCalendarLoadingState,
  setCollectionCalendarLoadingState,
  setIsCheckInAppointmentsLoading,
  setCheckInAppointments,
  setPatientsList,
  setIsAppointmentEditLoading,
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
  setCollectionCalendarDate,
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
  }
};
const getServiceTypes = (params?: IServiceTypesReqParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setServiceTypes([]));
    dispatch(setIsServiceTypesLoading(true));

    const response = await API.booking.getServiceTypes(params);
    const serviceTypes = sortServiceTypesByAlphabeticOrder(response.data.data.serviceTypes);

    dispatch(setServiceTypes(serviceTypes));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsServiceTypesLoading(false));
  }
};

const clearServiceTypes = () => (dispatch: AppDispatch) => {
  dispatch(setServiceTypes([]));
};

const getCheckInAppointments = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCheckInAppointmentsLoading(true));

    const response = await API.booking.getCheckInAppointments(patientId);

    dispatch(setCheckInAppointments(response.data.data.appointments));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsCheckInAppointmentsLoading(false));
  }
};

const refreshCheckInAppointments = (isRefresh: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsRefreshCheckInAppointments(isRefresh));
  } catch (error) {
    Sentry.captureException(error);
  }
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
  } finally {
    dispatch(setIsCheckInLoading(false));
  }
};

const createAppointment = (appointmentValues: ICreateAppointmentBody) => async (dispatch: AppDispatch) => {
  try {
    const providerId = appointmentValues.providerId
      ? appointmentValues.providerId
      : store.getState().booking.currentServiceProviderId;

    const patientId = store.getState().patients.patientsList.currentPatientId;

    const calendarDate = store.getState().booking.date;

    dispatch(setAppointmentLoading(true));

    appointmentValues.providerId = providerId;
    await API.booking.createAppointment(appointmentValues);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS),
          dataCy: CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS
        }
      })
    );

    dispatch(viewsMiddleware.closeModal(ModalName.AddAppointmentModal));
    dispatch(bookingMiddleware.getPatientAlerts(''));

    if (DateUtil.isSameDate(appointmentValues.date as Date, calendarDate)) {
      dispatch(getBookingAppointments(providerId, calendarDate));
    }

    if (patientId) {
      dispatch(bookingMiddleware.getPatientAppointmentsGroup(patientId));
    }
  } catch (error) {
    Sentry.captureException(error);
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
  }
};

const clearAppointmentDetails = () => (dispatch: AppDispatch) => {
  dispatch(setAppointmentDetails(null));
};

const editAppointment =
  (appointmentId: string, appointmentValues: IEditAppointmentBody) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsAppointmentEditLoading(true));

      const providerId = store.getState().booking.currentServiceProviderId;
      const calendarDate = store.getState().booking.date;
      const patientId = store.getState().patients.patientsList.currentPatientId;

      await API.booking.editAppointment(appointmentId, appointmentValues);
      dispatch(setIsAppointmentEditLoading(false));
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS),
            dataCy: CypressIds.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS
          }
        })
      );
      dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
      dispatch(bookingMiddleware.clearAppointmentDetails());
      dispatch(getBookingAppointments(providerId, calendarDate));

      if (patientId) {
        dispatch(bookingMiddleware.getPatientAppointmentsGroup(patientId));
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsAppointmentEditLoading(false));
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
    Sentry.captureException(error);
    dispatch(setPatientAlerts([]));
  }
};

const getPatientAppointmentsGroup = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.booking.getPatientAppointments(patientId);

    dispatch(setProfileAppointmentsGroup(response.data));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const cancelAppointment = (appointmentId: string, cancellationReason: string) => async (dispatch: AppDispatch) => {
  dispatch(setAppointmentLoading(true));

  try {
    const providerId = store.getState().booking.currentServiceProviderId;
    const calendarDate = store.getState().booking.date;

    await API.booking.cancelAppointment(appointmentId, {
      appointment: {
        cancellationReason
      }
    });
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_APPOINTMENTS_CANCEL_SUCCESS_STATUS),
          dataCy: CypressIds.PAGE_APPOINTMENTS_CANCEL_SUCCESS_STATUS
        }
      })
    );
    dispatch(viewsMiddleware.closeModal(ModalName.CancelAppointmentModal));
    dispatch(viewsMiddleware.closeModal(ModalName.EditAppointmentModal));
    dispatch(getBookingAppointments(providerId, calendarDate));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};

const getSpecimenAppointmentsFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setSpecimenAppointmentsFiltersArrayLoading(true));

    const { data } = await API.booking.getCollectionCalendarAppointmentFilters();

    dispatch(setSpecimenAppointmentsFilters(data.filters));
  } catch (error) {
    Sentry.captureException(error);
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
  clearServiceTypes,
  createAppointment,
  getAppointmentDetails,
  checkInAppointment,
  editAppointment,
  clearAppointmentDetails,
  getPatientAlerts,
  getPatientAppointmentsGroup,
  getCheckInAppointments,
  getSpecimenAppointmentsFilters,
  getSpecimenAppointments,
  clearSpecimenAppointments
};
