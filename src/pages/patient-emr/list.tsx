import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import PatientList from '@components/Patients/PatientList';
import { Box } from '@mui/material';

const List = () => (
  <Box>
    <MainBreadcrumb
      currentPage="Patient List"
      navigation={{
        basePath: '/',
        items: [{ name: 'Patient List/EMR', path: '/patient-emr/list' }]
      }}
    />
    <PatientList />
  </Box>
);

export default List;
