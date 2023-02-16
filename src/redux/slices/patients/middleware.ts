import API from '@axios/API';
import bookingHelpers from '@axios/booking/bookingHelpers';
import { IPatientAppointment, PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import {
  ICreateEncounterAddendumRequest,
  IUpdateEncounterAddendumRequest
} from '@axios/patientEmr/managerPatientEmrTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { viewsMiddleware } from '@redux/slices/views';
import * as Sentry from '@sentry/nextjs';
import { sortOrderTransformer } from 'redux/data-transformers/sortOrderTransformer';
import { AppDispatch, RootState } from 'redux/store';
import { IEncountersFilterOption, IEncountersReqBody, IPatientsReqBody, SortOrder } from 'types/patient';
import {
  AppointmentResponseStatus,
  GroupedFiltersOption,
  ICreateEncounterNoteProps,
  IEncounterList,
  IPatientList,
  IUpdateEncounterNoteProps
} from 'types/reduxTypes/patient-emrStateTypes';

import slice from './slice';

const {
  setPatientsList,
  setError,
  setPatientSearchFilters,
  setPatientAlertDetails,
  setCurrentPatientId,
  setEncountersSearchValue,
  setEncountersSelectedFilters,
  setPatientsLoadingState,
  setPatientsFiltersLoadingState,
  setPatientProfileOverview,
  setIsPatientProfileOverviewLoading,
  setEncountersLoadingState,
  setEncountersList,
  setEncounterFilters,
  setEncountersType,
  setEncounterDetailsInfo,
  setRecentAppointments,
  setIsRecentAppointmentsLoading,
  setPatientProfile,
  setIsPatientProfileLoading,
  setPatientHighlightsLoadingState,
  setPatientHighlightHeader,
  setPatientHighlights,
  setEncountersFiltersLoadingState,
  setCurrentEncounterID,
  setLatestTestResults,
  setTestResultsHistory,
  setProfileTestResults,
  setPatientAppointments,
  setEncountersDetailsLoadingState,
  setIsProfileTestResultsLoading,
  setIsTestResultsHistoryLoading,
  setCurrentAppointmentFilterType,
  setCreateEncounterNoteLoadingState,
  setUpdateEncounterNoteLoadingState,
  setUpdateEncounterAddendumLoadingState,
  setCreateEncounterAddendumLoadingState,
  setPatientContactInformation,
  setPatientContactInformationLoadingState,
  setIsPatientHighlightIntakeComplete,
  setIsPatientHighlightIntakeReminderActive,
  setPatientAppointmentsRequestStatus,
  setPatientAlertViewState,
  setPatientAlertDetailsLoading
} = slice.actions;

const cleanPatientList = () => async (dispatch: AppDispatch) => {
  dispatch(
    setPatientsList({
      patients: [],
      currentPage: 0,
      totalItems: 0,
      pageSize: 0
    })
  );
  dispatch(setPatientsLoadingState(false));
};

const cleanEncountersList = () => (dispatch: AppDispatch) => {
  dispatch(
    setEncountersList({
      encounters: [],
      currentPage: 0,
      totalItems: 0,
      pageSize: 0
    })
  );
  dispatch(setEncountersLoadingState(false));
};

const isPatientAlertViewOpen = (alertViewState: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setPatientAlertViewState(alertViewState));
};

const getPatientsList = (patientsListData: IPatientsReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsLoadingState(true));

    const response = await API.patients.getPatientsList(sortOrderTransformer(patientsListData) as IPatientsReqBody);
    const data: IPatientList = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      patients: response.data.data.patients
    };

    dispatch(setPatientsList(data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(cleanPatientList());
    dispatch(setError(error));
  } finally {
    dispatch(setPatientsLoadingState(false));
  }
};

const getPatientSearchFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsFiltersLoadingState(true));

    const response = await API.patients.getPatientSearchFilters();

    dispatch(setPatientSearchFilters(response.data.data.filters));
    dispatch(setPatientsFiltersLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setPatientsFiltersLoadingState(false));
  }
};

const getPatientAlertDetails = (alertId: string, abortSignal?: AbortSignal) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientAlertDetailsLoading(true));

    const response = await API.patients.getPatientAlertDetails(alertId, abortSignal);

    dispatch(setPatientAlertDetails(response.data.data.alerts ?? []));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setPatientAlertDetailsLoading(false));
  }
};
const resetPatientAlerts = () => (dispatch: AppDispatch) => {
  dispatch(setPatientAlertDetails([]));
};

const setEncounterSearch = (searchValue: string) => (dispatch: AppDispatch) => {
  dispatch(setEncountersSearchValue(searchValue));
};

const setSelectedEncounterFilters = (selectedFilter: IEncountersFilterOption[]) => (dispatch: AppDispatch) => {
  dispatch(setEncountersSelectedFilters(selectedFilter));
};

const setCurrentPatient = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentPatientId(patientId));
};

const setCurrentEncounterId = (encounterId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentEncounterID(encounterId));
};

export const createEncounterNote = (encounterNoteData: ICreateEncounterNoteProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreateEncounterNoteLoadingState(true));
    await API.patients.createEncounterNote(encounterNoteData);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setCreateEncounterNoteLoadingState(false));
  }
};

export const updateEncounterNote =
  (newEncounterNoteData: IUpdateEncounterNoteProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setUpdateEncounterNoteLoadingState(true));

      const response = await API.patients.updateEncounterNote(newEncounterNoteData);

      dispatch(setEncounterDetailsInfo(response.data.data.encounter));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    } finally {
      dispatch(setUpdateEncounterNoteLoadingState(false));
    }
  };

export const getEncounterFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setEncountersFiltersLoadingState(true));

    const response = await API.patients.getEncounterFilters();

    dispatch(setEncounterFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setEncountersFiltersLoadingState(false));
};

const getEncounterList = (encounterListData: IEncountersReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getEncounterList(encounterListData);
    const data: IEncounterList = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      encounters: response.data.data.encounters
    };

    dispatch(setEncountersList(data));
    dispatch(setEncountersLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(cleanPatientList());
    dispatch(setError(error));
  }
};

const getEncountersTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getEncounterTypes();

    dispatch(setEncountersType(response.data.data.encountersTypes));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getPatientRecentAppointments = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsRecentAppointmentsLoading(true));

    const response = await API.booking.getPatientRecentAppointments(patientId);

    dispatch(setRecentAppointments(response.data.appointments));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsRecentAppointmentsLoading(false));
  }
};

const getPatientProfile = (patientId?: string) => async (dispatch: AppDispatch) => {
  // Cleanup for patientProfile after component unmounting
  if (!patientId) {
    dispatch(setPatientProfile(null));

    return;
  }

  try {
    const response = await API.patients.getPatientProfile(patientId);

    dispatch(setIsPatientProfileLoading(true));
    dispatch(setPatientProfile(response.data.data));
  } catch (error) {
    dispatch(setPatientProfile(null));
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsPatientProfileLoading(false));
  }
};

const getPatientHighlight = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientHighlights(patientId);

    dispatch(setPatientHighlightsLoadingState(true));

    dispatch(setIsPatientHighlightIntakeComplete(response.data.data.isIntakeComplete));
    dispatch(setIsPatientHighlightIntakeReminderActive(response.data.data.isIntakeReminderActive));

    if (response.data.data.header) {
      dispatch(setPatientHighlightHeader(response.data.data.header));
    }

    dispatch(setPatientHighlights(response.data.data.highlights));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setPatientHighlightsLoadingState(false));
  }
};

const sendPatientIntakeReminder =
  (patientId: string, successMessage: string, failMessage: string) => async (dispatch: AppDispatch) => {
    try {
      await API.patients.sendIntakeReminder(patientId);
      dispatch(setIsPatientHighlightIntakeReminderActive(false));
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: successMessage
          }
        })
      );
    } catch (error) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: failMessage
          }
        })
      );
      Sentry.captureException(error);
      dispatch(setError(error));
    }
  };

const getEncounterDetailsInformation = (encounterId?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setEncountersDetailsLoadingState(true));

    if (encounterId) {
      const response = await API.patients.getEncounterDetails(encounterId);

      dispatch(setEncounterDetailsInfo(response.data.data.encounter));
    } else {
      dispatch(setEncounterDetailsInfo(null));
    }
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setEncountersDetailsLoadingState(false));
};

const createEncounterAddendum = (addendumData: ICreateEncounterAddendumRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreateEncounterAddendumLoadingState(true));
    await API.patients.createEncounterAddendum(addendumData);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setCreateEncounterAddendumLoadingState(false));
  }
};

const updateEncounterAddendum = (newAddendumData: IUpdateEncounterAddendumRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setUpdateEncounterAddendumLoadingState(true));

    const response = await API.patients.updateEncounterAddendum(newAddendumData);

    dispatch(setEncounterDetailsInfo(response.data.data.encounter));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setUpdateEncounterAddendumLoadingState(false));
  }
};

const getPatientProfileOverview = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientProfileOverviewLoading(true));

    const response = await API.patients.getPatientProfileOverview(patientId);

    dispatch(setPatientProfileOverview(response.data.data.overview));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsPatientProfileOverviewLoading(false));
  }
};

const getProfileTestResultLatest = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getProfileTestResultLatest(patientId);

    dispatch(setLatestTestResults(response.data.data.testResults));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const cleanTestResultsHistory = () => async (dispatch: AppDispatch) => {
  dispatch(setTestResultsHistory(null));
};

const getProfileTestResultsHistory = (patientId: string, testTypeId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsHistoryLoading(true));

    const response = await API.patients.getProfileTestResultsHistory(patientId, testTypeId);

    dispatch(setTestResultsHistory(response.data.data.testResultsHistory));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
    dispatch(setTestResultsHistory(null));
  } finally {
    dispatch(setIsTestResultsHistoryLoading(false));
  }
};

const getProfileTestResults = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsProfileTestResultsLoading(true));

    const response = await API.patients.getProfileTestResults(patientId);

    dispatch(setProfileTestResults(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsProfileTestResultsLoading(false));
  }
};

const getPatientContactInformation = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setPatientContactInformationLoadingState(true));

  try {
    const response = await API.patients.getContactInformation(patientId);

    dispatch(setPatientContactInformation(response.data.data.information));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setPatientContactInformationLoadingState(false));
  }
};

const getPatientAppointments =
  (
    patientId: string,
    page: number,
    order: SortOrder | null,
    orderBy: Exclude<keyof IPatientAppointment, 'time'> | null,
    selectedFilters?: GroupedFiltersOption[]
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const excludeTitleFilters = selectedFilters?.map(({ id, type }) => ({ id, type }));

      const { data, pageSize, currentPage, totalItems } = await bookingHelpers.getAppointmentsListFromParams({
        patientId,
        page,
        order,
        orderBy,
        filters: excludeTitleFilters
      });

      dispatch(
        setPatientAppointments({
          list: {
            appointments: data.appointments,
            currentPage,
            pageSize,
            totalItems
          },
          order,
          orderBy,
          selectedFilters,
          status: AppointmentResponseStatus.SUCCESS
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setPatientAppointmentsRequestStatus(AppointmentResponseStatus.FAIL));
      dispatch(setError(error));
    }
  };

const setCurrentAppointmentType = (appointmentType: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentAppointmentFilterType(appointmentType));
};

const resetAppointmentsList = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const currentValues = getState().patients.patientAppointments;

    dispatch(
      setPatientAppointments({
        ...currentValues,
        filters: null,
        selectedFilters: [],
        order: SortOrder.Asc,
        orderBy: PatientAppointmentsSortField.Date,
        status: AppointmentResponseStatus.IDLE,
        list: {
          ...currentValues.list,
          appointments: null
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

export default {
  getPatientsList,
  getPatientSearchFilters,
  getPatientAlertDetails,
  resetPatientAlerts,
  getPatientProfileOverview,
  setEncountersLoadingState,
  resetAppointmentsList,
  getEncounterList,
  getPatientRecentAppointments,
  setEncounterSearch,
  setSelectedEncounterFilters,
  getEncounterFilters,
  setCurrentPatient,
  cleanPatientList,
  createEncounterNote,
  updateEncounterNote,
  getPatientProfile,
  getPatientHighlight,
  getEncountersTypes,
  getEncounterDetailsInformation,
  createEncounterAddendum,
  updateEncounterAddendum,
  setCurrentEncounterId,
  getProfileTestResultLatest,
  getProfileTestResultsHistory,
  getProfileTestResults,
  getPatientAppointments,
  cleanEncountersList,
  setCurrentAppointmentType,
  getPatientContactInformation,
  sendPatientIntakeReminder,
  cleanTestResultsHistory,
  isPatientAlertViewOpen
};
