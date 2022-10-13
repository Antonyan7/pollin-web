import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';

import MainCard from '@ui-component/cards/MainCard';
import PatientDetailsTabView from '@ui-component/PatientDetailsTabView';

import PatientAlertView from '../PatientAlertView';
import PatientHighlightsView from '../PatientHighlightsView';

interface PatientDetailsProps {
  patientName?: string;
  id?: string;
}

const PatientDetails = ({ patientName = '', id = '' }: PatientDetailsProps) => (
  <>
    <PatientAlertView />
    <MainBreadcrumb
      currentPage={patientName}
      navigation={{
        basePath: '/',
        items: [
          { name: 'Patient List/EMR', path: '/patient-emr/list' },
          { name: patientName, path: `/patient-emr/list/${id}` }
        ]
      }}
    />
    <br />
    <PatientHighlightsView />
    <br />
    <MainCard content={false}>
      <PatientDetailsTabView />
    </MainCard>
  </>
);

export default PatientDetails;
