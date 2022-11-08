export interface IPatientInformationState {
  isPatientInfoConfirmed: boolean;
}

export interface IPatientInformationContextActions {
  type: 'UPDATE_IS_PATIENT_INFO_CONFIRMED';
  status: boolean;
}
