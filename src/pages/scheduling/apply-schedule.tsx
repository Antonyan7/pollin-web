import React from 'react';
import ApplyScheduleForm from '@components/Scheduling/ApplyScheduleForm';
import ApplyScheduleHeader from '@components/Scheduling/ApplyScheduleHeader';
import { Box, useTheme } from '@mui/material';

const ApplySchedule = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: '20px', borderRadius: '5px', backgroundColor: theme.palette.background.paper }}>
      {/* will be removed with breadcrumb */}
      <ApplyScheduleHeader />

      <ApplyScheduleForm />
    </Box>
  );
};

export default ApplySchedule;
