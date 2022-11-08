import React, { createContext, useContext, useReducer } from 'react';

import { PatientInformationReducer } from './reducers/PatientInformationReducer';
import { IPatientInformationContextActions, IPatientInformationState } from './types/PatientInfromationContextTypes';

const initialState: IPatientInformationState = {
  isPatientInfoConfirmed: false
};

const initialPatientInformationContext: {
  patientInfo: IPatientInformationState;
  setPatientInfo: React.Dispatch<IPatientInformationContextActions>;
} = {
  patientInfo: initialState,
  setPatientInfo: () => {}
};

const PatientInformationContext = createContext(initialPatientInformationContext);

export const PatientInformationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [patientInfo, setPatientInfo] = useReducer(PatientInformationReducer, initialState);

  const value = React.useMemo(
    () => ({
      patientInfo,
      setPatientInfo
    }),
    [patientInfo]
  );

  return <PatientInformationContext.Provider value={value}>{children}</PatientInformationContext.Provider>;
};

export const UsePatientInfoState = () => useContext(PatientInformationContext);
