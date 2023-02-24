import React, { useEffect } from 'react';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import Encounters from '@ui-component/encounters/components/Encounters';

import PatientEmrLayout from '../index';

const EncountersTab = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [router.query.id]);

  return <Encounters />;
};

EncountersTab.PageLayout = PatientEmrLayout;

export default EncountersTab;
