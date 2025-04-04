import React from 'react';
import { PatientProfileNavigatorContextProvider } from 'context/PatientProfileNavigatorContext';

import PatientProfile from '@ui-component/profile/PatientProfile';

import PatientEmrLayout from '../index';

const PatientProfileTab = () => (
  <PatientProfileNavigatorContextProvider>
    <PatientProfile />
  </PatientProfileNavigatorContextProvider>
);

PatientProfileTab.PageLayout = PatientEmrLayout;
export default PatientProfileTab;
