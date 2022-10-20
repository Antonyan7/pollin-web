import React from 'react';
import PatientEmrLayout from 'layout/PatientEmrLayout';

import PatientProfile from '@ui-component/profile/PatientProfile';

const PatientProfileTab = () => <PatientProfile />;

PatientProfileTab.PageLayout = PatientEmrLayout;
export default PatientProfileTab;
