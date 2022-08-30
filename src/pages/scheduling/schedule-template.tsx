import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ScheduleTemplatesComponent from '@components/Scheduling/scheduleTemplates';
import { Box } from '@mui/material';

const ScheduleTemplates = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <MainBreadcrumb
      currentPage="Schedule Templates"
      navigation={{
        basePath: '/',
        items: [{ name: 'Schedule Templates', path: '/scheduling/schedule-template' }]
      }}
    />
    <ScheduleTemplatesComponent />
  </Box>
);

export default ScheduleTemplates;
