import React, { useContext, useMemo, useReducer } from 'react';

import { emptyFunction } from '@utils/contextUtils';

import { patientProfileNavigatorReducer } from './reducers/PatientProfileNavigatorReducer';
import {
  IPatientProfileNavigatorState,
  PatientProfileNavigatorContextActionTypes,
  PatientProfilePageName
} from './types/PatientProfileNavigatorContextTypes';

const initialState: IPatientProfileNavigatorState = {
  page: null,
  name: null
};

interface IOverloadNavigateTo {
  (pageName: PatientProfilePageName.AppointmentsList): void;
}

export interface IPatientProfileNavigatorContext {
  page: JSX.Element | null;
  profilePageName: PatientProfilePageName | null;
  navigateTo: IOverloadNavigateTo;
  navigateBack: () => void;
}

const Context = React.createContext<IPatientProfileNavigatorContext>({
  page: null,
  profilePageName: null,
  navigateTo: emptyFunction,
  navigateBack: emptyFunction
});

export const PatientProfileNavigatorContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [profilePage, setProfilePage] = useReducer(patientProfileNavigatorReducer, initialState);

  const navigateTo: IOverloadNavigateTo = (pageName) => {
    if (pageName === PatientProfilePageName.AppointmentsList) {
      setProfilePage({ type: PatientProfileNavigatorContextActionTypes.APPOINTMENTS_LIST_PAGE, props: {} });
    }
  };

  const value: IPatientProfileNavigatorContext = useMemo(
    () => ({
      page: profilePage.page,
      profilePageName: profilePage.name,
      navigateTo,
      navigateBack: () => setProfilePage({ type: PatientProfileNavigatorContextActionTypes.NONE })
    }),
    [profilePage]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const usePatientProfileNavigatorContext = () => useContext(Context);
