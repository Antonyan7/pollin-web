import React from 'react';
import { PatientProfileNavigatorContextProvider } from 'context/PatientProfileNavigatorContext';
import PatientEmrLayout from 'layout/PatientEmrLayout';

import PatientProfile from '@ui-component/profile/PatientProfile';

const PatientProfileTab = () => (
  <PatientProfileNavigatorContextProvider>
    <PatientProfile />
  </PatientProfileNavigatorContextProvider>
);

PatientProfileTab.PageLayout = PatientEmrLayout;
export default PatientProfileTab;
