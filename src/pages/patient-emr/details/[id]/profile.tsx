import React from 'react';
import PatientEmrLayout from 'layout/PatientEmrLayout';

import PatientProfile from '@ui-component/profile/PatientProfile';

import { PatientProfileNavigatorContext } from '../../../../context/PatientProfileNavigatorContext';

const PatientProfileTab = () => (
  <PatientProfileNavigatorContext>
    <PatientProfile />
  </PatientProfileNavigatorContext>
);

PatientProfileTab.PageLayout = PatientEmrLayout;
export default PatientProfileTab;
