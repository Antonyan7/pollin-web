import { PatientInformationContextStaticData } from '../static/PatientInformationContextStaticData';
import { IPatientInformationContextActions, IPatientInformationState } from '../types/PatientInfromationContextTypes';

export const PatientInformationReducer = (
  state: IPatientInformationState,
  action: IPatientInformationContextActions
) => {
  switch (action.type) {
    case PatientInformationContextStaticData.UPDATE_IS_PATIENT_INFO_CONFIRMED:
      return {
        ...state,
        isPatientInfoConfirmed: action.status
      };
    default:
      return state;
  }
};
