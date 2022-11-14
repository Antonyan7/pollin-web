import React from 'react';
import { PatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import PatientEmrLayout from 'layout/PatientEmrLayout';

import PatientProfile from '@ui-component/profile/PatientProfile';

const PatientProfileTab = () => (
  <PatientProfileNavigatorContext>
    <PatientProfile />
  </PatientProfileNavigatorContext>
);

PatientProfileTab.PageLayout = PatientEmrLayout;
export default PatientProfileTab;
