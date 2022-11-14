export class PatientInformationContextActionTypes {
  public static readonly UPDATE_IS_PATIENT_INFO_CONFIRMED = 'UPDATE_IS_PATIENT_INFO_CONFIRMED';
}

export interface IPatientInformationState {
  isPatientInfoConfirmed: boolean;
}
