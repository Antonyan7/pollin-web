import API from '@axios/API';
import bookingHelpers from '@axios/booking/bookingHelpers';
import { IPatientAppointment, PatientAppointmentsFilterOptions } from '@axios/booking/managerBookingTypes';
import {
  ICreateEncounterAddendumRequest,
  IUpdateEncounterAddendumRequest
} from '@axios/patientEmr/managerPatientEmrTypes';
import * as Sentry from '@sentry/nextjs';
import { sortOrderTransformer } from 'redux/data-transformers/sortOrderTransformer';
import { AppDispatch } from 'redux/store';
import { IEncountersReqBody, IPatientsReqBody, SortOrder } from 'types/patient';
import {
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
  setPatientsLoadingState,
  setPatientsFiltersLoadingState,
  setPatientProfileOverview,
  setIsPatientProfileOverviewLoading,
  setEncountersLoadingState,
  setEncountersList,
  setEncounterFilters,
  setEncountersType,
  setEncounterDetailsInfo,
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
  setPatientAppointmentsList,
  setEncountersDetailsLoadingState,
  setIsProfileTestResultsLoading,
  setIsTestResultsHistoryLoading,
  setCurrentAppointmentFilterType,
  setCreateEncounterNoteLoadingState,
  setUpdateEncounterNoteLoadingState,
  setUpdateEncounterAddendumLoadingState,
  setCreateEncounterAddendumLoadingState,
  setPatientContactInformation,
  setPatientContactInformationLoadingState
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

const getPatientAlertDetails = (alertId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientAlertDetails(alertId);

    dispatch(setPatientAlertDetails(response.data.data.alerts ?? []));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};
const resetPatientAlerts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientAlertDetails([]));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
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
    dispatch(setEncountersLoadingState(true));

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

const getProfileTestResultsHistory = (patientId: string, testTypeId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsProfileTestResultsLoading(true));

    const response = await API.patients.getProfileTestResultsHistory(patientId, testTypeId);

    dispatch(setTestResultsHistory(response.data.data.testResultsHistory));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsProfileTestResultsLoading(false));
  }
};

const getProfileTestResults = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsHistoryLoading(true));

    const response = await API.patients.getProfileTestResults(patientId);

    dispatch(setProfileTestResults(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsTestResultsHistoryLoading(false));
  }
};

const getInitialPatientAppointments = () => async (dispatch: AppDispatch) => {
  try {
    const { data, pageSize, currentPage, totalItems } = await bookingHelpers.getAppointmentsListFromParams();

    dispatch(
      setPatientAppointmentsList({
        appointments: data.appointments,
        currentPage,
        pageSize,
        totalItems
      })
    );
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
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
    page: number,
    order: SortOrder | null,
    orderBy: Exclude<keyof IPatientAppointment, 'time'> | null,
    filters?: Omit<PatientAppointmentsFilterOptions, 'title'>[]
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data, pageSize, currentPage, totalItems } = await bookingHelpers.getAppointmentsListFromParams({
        page,
        order,
        orderBy,
        filters
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
          filters
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    }
  };

const setCurrentAppointmentType = (appointmentType: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentAppointmentFilterType(appointmentType));
};

export default {
  getPatientsList,
  getPatientSearchFilters,
  getPatientAlertDetails,
  resetPatientAlerts,
  getPatientProfileOverview,
  getEncounterList,
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
  getInitialPatientAppointments,
  getPatientAppointments,
  cleanEncountersList,
  setCurrentAppointmentType,
  getPatientContactInformation
};
