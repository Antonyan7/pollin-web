import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';
import { SexAtBirth } from 'types/reduxTypes/patient-emrStateTypes';

import CircularLoading from '@ui-component/circular-loading';

import FemaleGynaecologicalHistory from './FemaleGynaecologicalHistory';
import FemalePatientMenstrualCycleHistory from './FemalePatientMenstrualCycleHistory';
import FemalePregnancyInformation from './FemalePregnancyInformation';
import FertilityHistory from './FertilityHistory';

const MedicalHistory = () => {
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const isPatientProfileLoading = useAppSelector(patientsSelector.isPatientProfileLoading);
  const {
    query: { id: currentPatientId }
  } = useRouter();

  useEffect(() => {
    if (typeof currentPatientId === 'string') {
      dispatch(patientsMiddleware.getPatientProfile(currentPatientId));
    }
  }, [currentPatientId]);

  if (isPatientProfileLoading) {
    return <CircularLoading />;
  }

  return (
    <Stack spacing={8} direction="column">
      {patientProfile?.sexAtBirth === SexAtBirth.Female ? (
        <>
          <FertilityHistory />
          <FemalePregnancyInformation />
          <FemalePatientMenstrualCycleHistory />
          <FemaleGynaecologicalHistory />
        </>
      ) : (
        <div>Male component work in progress!!!</div>
      )}
    </Stack>
  );
};

export default MedicalHistory;
