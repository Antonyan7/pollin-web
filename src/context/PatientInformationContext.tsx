import React, { createContext, useContext, useReducer } from 'react';

import { IUpdateIsPatientInfoConfirmedAction } from './actions/PatientInfromationContextActions';
import { patientInformationReducer } from './reducers/PatientInformationReducer';
import { IPatientInformationState } from './types/PatientInformationContextTypes';

const initialState: IPatientInformationState = {
  isPatientInfoConfirmed: false
};

export interface IPatientInformationContext {
  patientInfo: IPatientInformationState;
  setPatientInfo: React.Dispatch<IUpdateIsPatientInfoConfirmedAction>;
}

const initialPatientInformationContext: IPatientInformationContext = {
  patientInfo: initialState,
  setPatientInfo: () => {}
};

const Context = createContext<IPatientInformationContext>(initialPatientInformationContext);

export const PatientInformationContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [patientInfo, setPatientInfo] = useReducer(patientInformationReducer, initialState);

  const value: IPatientInformationContext = React.useMemo(
    () => ({
      patientInfo,
      setPatientInfo
    }),
    [patientInfo]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const usePatientInfoContext = () => useContext(Context);
