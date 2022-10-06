import API from '@axios/API';
import * as Sentry from '@sentry/nextjs';
import { AppDispatch } from 'redux/store';
import {
  ICreateEncounterNoteProps,
  IEncounterList,
  IPatientList,
  IUpdateEncounterNoteProps
} from 'types/reduxTypes/patient-emr';

import { IEncountersReqBody, IPatientsReqBody } from '../../../types/patient';
import { sortOrderTransformer } from '../../data-transformers/sortOrderTransformer';

import slice from './slice';

const {
  setPatientsList,
  setError,
  setPatientSearchFilters,
  setPatientAlertDetails,
  setCurrentPatientId,
  setPatientsLoadingState,
  setPatientsFiltersLoadingState,
  setEncountersLoadingState,
  setEncountersList,
  setEncountersType,
  setEncounterDetailsInfo
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

const getPatientsList = (patientsListData: IPatientsReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsLoadingState(true));

    const response = await API.patients.getPatientsList(sortOrderTransformer(patientsListData));
    const data: IPatientList = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      patients: response.data.data.patients
    };

    dispatch(setPatientsList(data));
    dispatch(setPatientsLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(cleanPatientList());
    dispatch(setError(error));
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

    dispatch(setPatientAlertDetails(response.data.data.alerts));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const setCurrentPatient = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentPatientId(patientId));
};

export const createEncounterNote = (data: ICreateEncounterNoteProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsLoadingState(true));
    await API.patients.createEncounterNote(data);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setPatientsLoadingState(false));
  }
};

export const updateEncounterNote =
  (newEncounterNoteData: IUpdateEncounterNoteProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setPatientsLoadingState(true));

      const response = await API.patients.updateEncounterNote(newEncounterNoteData);

      dispatch(setEncounterDetailsInfo(response.data.data.encounter));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    } finally {
      dispatch(setPatientsLoadingState(false));
    }
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

const getEncounterDetailsInformation = (encounterId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getEncounterDetails(encounterId);

    dispatch(setEncounterDetailsInfo(response.data.data.encounter));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

export default {
  getPatientsList,
  getPatientSearchFilters,
  getPatientAlertDetails,
  setCurrentPatient,
  cleanPatientList,
  createEncounterNote,
  updateEncounterNote,
  getEncounterList,
  getEncountersTypes,
  getEncounterDetailsInformation
};
