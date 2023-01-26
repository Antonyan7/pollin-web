import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import Encounters from '@ui-component/encounters/components/Encounters';

import PatientEmrLayout from '../index';

const EncountersTab = () => {
  const router = useRouter();
  const patientId = useAppSelector(patientsSelector.currentPatientId);

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [router.query.id]);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getEncounterList({ patientId }));
    }
  }, [patientId]);

  return <Encounters />;
};

EncountersTab.PageLayout = PatientEmrLayout;

export default EncountersTab;
