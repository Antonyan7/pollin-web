import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ApplyScheduleForm from '@components/Scheduling/ApplyScheduleForm';
import { Box, useTheme } from '@mui/material';

const ApplySchedule = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: '20px', borderRadius: '5px', backgroundColor: theme.palette.background.paper }}>
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
};

export default ApplySchedule;
