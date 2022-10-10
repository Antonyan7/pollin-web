import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import CreateTemplate from '@components/Scheduling/CreateTemplate';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const CreateSchedulingTemplate = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            { name: t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE), path: '/scheduling/schedule-templates' },
            { name: t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TITLE), path: '/scheduling/create-template' }
          ]
        }}
      />
      <CreateTemplate />
    </Box>
  );
};

export default CreateSchedulingTemplate;
