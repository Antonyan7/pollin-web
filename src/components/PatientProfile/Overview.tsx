import React, { useEffect } from 'react';
import { EditOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';

import WidgetLayout from './Layout';

const Overview = () => {
  const patinetProfileOverview = useAppSelector(patientsSelector.patientProfileOverview);
  const isPatientProfileOverview = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);

  useEffect(() => {
    if (currentPatientId) {
      dispatch(patientsMiddleware.getPatientProfileOverview(currentPatientId));
    }
  }, [currentPatientId]);

  return (
    <WidgetLayout
      loading={isPatientProfileOverview}
      data={patinetProfileOverview}
      secondary={
        <IconButton>
          <EditOutlined color="primary" />
        </IconButton>
      }
    />
  );
};

export default Overview;
