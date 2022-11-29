import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

import WidgetLayout from './Layout';

const TestResults = () => {
  const [t] = useTranslation();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const profileTestResults = useAppSelector(patientsSelector.profileTestResults);
  const isPatientProfileOverviewLoading = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);

  const emptyWidgetTitle = t(Translation.PAGE_PATIENT_WIDGET_TEST_RESULTS_TITLE);

  useEffect(() => {
    if (currentPatientId) {
      dispatch(patientsMiddleware.getProfileTestResults(currentPatientId));
    }
  }, [currentPatientId]);

  return (
    <WidgetLayout
      data={profileTestResults?.patient}
      emptyWidgetTitle={emptyWidgetTitle}
      loading={isPatientProfileOverviewLoading}
    />
  );
};

export default TestResults;
