import React from 'react';

import AppointmentsList from '@ui-component/profile/AppointmentsList';

import { PatientProfileNavigatorAction } from '../actions/PatientProfileNavigatorContextActions';
import {
  IPatientProfileNavigatorState,
  PatientProfileNavigatorContextActionTypes,
  PatientProfilePageName
} from '../types/PatientProfileNavigatorContextTypes';

export const patientProfileNavigatorReducer = (
  state: IPatientProfileNavigatorState,
  action: PatientProfileNavigatorAction
): IPatientProfileNavigatorState => {
  switch (action.type) {
    case PatientProfileNavigatorContextActionTypes.APPOINTMENTS_LIST_PAGE:
      return {
        ...state,
        page: React.createElement(AppointmentsList, action.props),
        name: PatientProfilePageName.AppointmentsList
      };
    case PatientProfileNavigatorContextActionTypes.NONE:
      return {
        page: null,
        name: null
      };
    default:
      return state;
  }
};
