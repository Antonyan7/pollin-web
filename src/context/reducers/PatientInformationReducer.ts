import { PatientInformationContextActions } from '../actions/PatientInfromationContextActions';
import {
  IPatientInformationState,
  PatientInformationContextActionTypes
} from '../types/PatientInformationContextTypes';

export const patientInformationReducer = (
  state: IPatientInformationState,
  action: PatientInformationContextActions
): IPatientInformationState => {
  switch (action.type) {
    case PatientInformationContextActionTypes.UPDATE_IS_PATIENT_INFO_CONFIRMED:
      return {
        ...state,
        isPatientInfoConfirmed: action.status
      };
    default:
      return state;
  }
};
