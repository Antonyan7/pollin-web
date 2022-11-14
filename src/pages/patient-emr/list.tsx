import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import PatientList from '@components/Patients/PatientList';
import { Box } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const List = () => {
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(patientsMiddleware.setCurrentPatient(''));
    dispatch(patientsMiddleware.cleanEncountersList());
  }, []);

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_PATIENT_LIST_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_PATIENT_LIST_TITLE), path: '/patient-emr/list' }]
        }}
      />
      <PatientList />
    </Box>
  );
};

export default List;
