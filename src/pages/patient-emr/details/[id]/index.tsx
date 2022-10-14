import React from 'react';
import PatientEmrLayout from 'layout/PatientEmrLayout';

import Encounters from './encounters';

const PatientDetails = () => <Encounters />;

PatientDetails.PageLayout = PatientEmrLayout;
export default PatientDetails;
