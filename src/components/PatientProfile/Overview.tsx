import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

import WidgetLayout from './Layout';

const Overview = () => {
  const [t] = useTranslation();
  const patientProfileOverview = useAppSelector(patientsSelector.patientProfileOverview);
  const isPatientProfileOverview = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);

  const widgetTitle = t(Translation.PAGE_PATIENT_WIDGET_PROFILE_OVERVIEW_TITLE);

  useEffect(() => {
    if (currentPatientId) {
      dispatch(patientsMiddleware.getPatientProfileOverview(currentPatientId));
    }
  }, [currentPatientId]);

  return (
    <WidgetLayout
      loading={isPatientProfileOverview}
      emptyWidgetTitle={widgetTitle}
      data={patientProfileOverview}
      secondary={
        <IconButton>
          <EditOutlined color="primary" />
        </IconButton>
      }
    />
  );
};

export default Overview;
