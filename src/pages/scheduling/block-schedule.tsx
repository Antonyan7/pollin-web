import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import BlockScheduleComponent from '@components/Scheduling/blockSchedule';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const BlockSchedule = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_BLOCK_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_SCHEDULING_BLOCK_TITLE), path: '/scheduling/block-schedule' }]
        }}
      />
      <BlockScheduleComponent />
    </Box>
  );
};

export default BlockSchedule;
