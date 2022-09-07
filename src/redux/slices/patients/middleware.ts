import API from '@axios/API';
import { AppDispatch } from 'redux/store';

import { IPatientsReqBody } from '../../../types/patient';

import slice from './slice';

const { setPatientsList, setError, setPatientSearchFilters, setPatientAlertDetails } = slice.actions;

const getPatientsList = (patientsListData: IPatientsReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientsList(patientsListData);

    dispatch(setPatientsList(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

const getPatientSearchFilters = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientSearchFilters();

    dispatch(setPatientSearchFilters(response.data.data.filters));
  } catch (error) {
    dispatch(setError(error));
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

export default {
  getPatientsList,
  getPatientSearchFilters,
  getPatientAlertDetails
};
