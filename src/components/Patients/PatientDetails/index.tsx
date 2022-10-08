import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';

import MainCard from '@ui-component/cards/MainCard';
import PatientDetailsTabView from '@ui-component/PatientDetailsTabView';

import PatientAlertView from '../PatientAlertView';

interface PatientDetailsProps {
  patientName?: string;
  id?: string;
}

const PatientDetails = ({ patientName, id }: PatientDetailsProps) => (
  <>
    <PatientAlertView />
    <MainBreadcrumb
      currentPage="Patient Details"
      navigation={{
        basePath: '/',
        items: [
          { name: 'Patient List/EMR', path: '/patient-emr/list' },
          { name: patientName, path: `/patient-emr/list/${id}` }
        ]
      }}
    />
    <br />
    <MainCard content={false}>
      <PatientDetailsTabView />
    </MainCard>
  </>
);

export default PatientDetails;
