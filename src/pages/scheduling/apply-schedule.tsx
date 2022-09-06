import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ApplyScheduleForm from '@components/Scheduling/ApplyScheduleForm';
import { Box } from '@mui/material';

const ApplySchedule = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage="Apply Schedule"
        navigation={{
          basePath: '/',
          items: [{ name: 'Apply Schedule', path: '/scheduling/apply-schedule' }]
        }}
      />

      <ApplyScheduleForm />
    </Box>
  );

export default ApplySchedule;
