import React, { useEffect } from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import PatientList from '@components/Patients/PatientList';
import { Box } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';

const List = () => {
  useEffect(() => {
    dispatch(patientsMiddleware.cleanEncountersList());
  }, []);

  return (
    <Box>
      <MainBreadcrumb
        currentPage="Patient List"
        navigation={{
          basePath: '/',
          items: [{ name: 'Patient List', path: '/patient-emr/list' }]
        }}
      />
      <PatientList />
    </Box>
  );
};

export default List;
