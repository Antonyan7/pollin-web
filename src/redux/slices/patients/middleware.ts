import API from '@axios/API';
import { AppDispatch } from 'redux/store';

import { IPatientsReqBody } from '../../../types/patient';

import slice from './slice';

const {
  setPatientsList,
  setError,
  setPatientSearchFilters,
  setPatientAlertDetails,
  setCurrentPatientId,
  setPatientsLoadingState,
  setPatientsFiltersLoadingState
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

    const response = await API.patients.getPatientsList(patientsListData);

    dispatch(setPatientsList(response.data.data));
    dispatch(setPatientsLoadingState(false));
  } catch (error) {
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
    dispatch(setError(error));
    dispatch(setPatientsFiltersLoadingState(false));
  }
};

const getPatientAlertDetails = (alertId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientAlertDetails(alertId);

    dispatch(setPatientAlertDetails(response.data.data.alerts));
  } catch (error) {
    dispatch(setError(error));
  }
};

const setCurrentPatient = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentPatientId(patientId));
};

export default {
  getPatientsList,
  getPatientSearchFilters,
  getPatientAlertDetails,
  setCurrentPatient,
  cleanPatientList
};
