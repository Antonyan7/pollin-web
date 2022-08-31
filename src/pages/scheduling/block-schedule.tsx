import React from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import BlockScheduleComponent from '@components/Scheduling/blockSchedule';
import { Box } from '@mui/material';

const BlockSchedule = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <MainBreadcrumb
      currentPage="Block Schedule"
      navigation={{
        basePath: '/',
        items: [{ name: 'Block Schedule', path: '/scheduling/block-schedule' }]
      }}
    />
    <BlockScheduleComponent />
  </Box>
);

export default BlockSchedule;
