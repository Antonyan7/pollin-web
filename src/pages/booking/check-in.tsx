import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Box } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const Checkin = () => {
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(patientsMiddleware.setCurrentPatient(''));
    dispatch(patientsMiddleware.cleanEncountersList());
  }, []);

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_CHECK_IN_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_PATIENT_LIST_TITLE), path: '/booking/check-in' }]
        }}
      />
    </Box>
  );
};

export default Checkin;
