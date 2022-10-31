import React from 'react';
import { ITestResultHistory } from '@axios/patientEmr/managerPatientEmrTypes';
import { SxProps } from '@mui/system';
import { PatientProfileOverview } from 'types/reduxTypes/patient-emrStateTypes';

export interface WidgetProps {
  data: PatientProfileOverview | ITestResultHistory;
  secondary?: React.ReactNode;
  sx?: SxProps;
}
