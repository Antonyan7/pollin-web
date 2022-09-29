import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import ViewScheduleTemplate from '@components/Scheduling/ViewScheduleTemplate';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const ViewSchedule = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_VIEW_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            { name: t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE), path: '/scheduling/schedule-template' },
            { name: t(Translation.PAGE_SCHEDULING_VIEW_TITLE), path: '/scheduling/view-schedule' }
          ]
        }}
      />
      <ViewScheduleTemplate />
    </Box>
  );
};

export default ViewSchedule;
