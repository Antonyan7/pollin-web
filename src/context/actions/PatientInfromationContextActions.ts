import { PatientInformationContextActionTypes } from '../types/PatientInformationContextTypes';

export interface IUpdateIsPatientInfoConfirmedAction {
  type: typeof PatientInformationContextActionTypes.UPDATE_IS_PATIENT_INFO_CONFIRMED;
  status: boolean;
}

export type PatientInformationContextActions = IUpdateIsPatientInfoConfirmedAction;
