import API from '@axios/API';
import { AppDispatch } from 'redux/store';

import { IPatientsReqBody } from '../../../types/patient';

import slice from './slice';

const { setPatientsList, setError } = slice.actions;

const getPatientsList = (patientsListData: IPatientsReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientsList(patientsListData);

    dispatch(setPatientsList(response.data.data));
  } catch (error) {
    dispatch(setError(error));
  }
};

export default {
  getPatientsList
};
