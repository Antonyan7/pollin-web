import React from 'react';

import { emptyFunction } from '@utils/contextUtils';

export enum ProfilePageName {
  None = '',
  AppointmentsListPage = 'AppointmentsList'
}

export interface PatientProfileNavigatorContextData {
  profilePageName: ProfilePageName;
  navigateTo: (pageName: ProfilePageName) => void;
  navigateBack: () => void;
}

export const PatientProfileNavigatorContext = React.createContext<PatientProfileNavigatorContextData>({
  profilePageName: ProfilePageName.None,
  navigateTo: emptyFunction,
  navigateBack: emptyFunction
});
