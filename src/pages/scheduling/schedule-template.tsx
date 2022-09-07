import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ScheduleTemplatesComponent from '@components/Scheduling/scheduleTemplates';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const ScheduleTemplates = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE), path: '/scheduling/schedule-template' }]
        }}
      />
      <ScheduleTemplatesComponent />
    </Box>
  );
};

export default ScheduleTemplates;
