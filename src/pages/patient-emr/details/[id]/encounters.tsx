import React, { useEffect } from 'react';
import PatientEmrLayout from 'layout/PatientEmrLayout';
import { useRouter } from 'next/router';
import { dispatch } from 'redux/hooks';
import { patientsMiddleware } from 'redux/slices/patients';

import Encounters from '@ui-component/encounters/Encounters';

const EncountersTab = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
      dispatch(patientsMiddleware.getPatientProfile(router.query.id as string));
    }
  }, [router.query.id]);

  return <Encounters />;
};

EncountersTab.PageLayout = PatientEmrLayout;

export default EncountersTab;
