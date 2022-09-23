import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ApplyScheduleForm from '@components/Scheduling/applySchedule/ApplyScheduleForm';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const ApplySchedule = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', borderRadius: '5px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_APPLY_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_SCHEDULING_APPLY_TITLE), path: '/scheduling/apply-schedule' }]
        }}
      />

      <ApplyScheduleForm />
    </Box>
  );
};

export default ApplySchedule;
