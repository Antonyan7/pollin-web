import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';

import WidgetLayout from './Layout';

const TestResults = () => {
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const profileTestResults = useAppSelector(patientsSelector.profileTestResults);
  const isPatientProfileOverviewLoading = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);

  useEffect(() => {
    if (currentPatientId) {
      dispatch(patientsMiddleware.getProfileTestResults(currentPatientId));
    }
  }, [currentPatientId]);

  return <WidgetLayout data={profileTestResults?.patient} loading={isPatientProfileOverviewLoading} />;
};

export default TestResults;
