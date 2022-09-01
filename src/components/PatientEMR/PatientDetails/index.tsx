import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';

import MainCard from '@ui-component/cards/MainCard';
import PatientDetailsTabView from '@ui-component/PatientDetailsTabView';

interface PatientDetailsProps {
  patientName: string;
}

const PatientDetails = ({ patientName }: PatientDetailsProps) => (
  <>
    <MainBreadcrumb
      currentPage="Patient Details"
      navigation={{
        basePath: '/',
        items: [
          { name: 'Patient List', path: '/patientEMR/patient-list' },
          { name: patientName, path: `/patientEMR/patient-list/${patientName}` }
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
