import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import EditTemplate from '@components/Scheduling/EditTemplate';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const EditSchedulingTemplate = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_SCHEDULING_EDIT_TEMPLATES_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            { name: t(Translation.PAGE_SCHEDULING_TEMPLATES_TITLE), path: '/scheduling/schedule-templates' },
            { name: t(Translation.PAGE_SCHEDULING_EDIT_TEMPLATES_TITLE), path: '/scheduling/edit-template' }
          ]
        }}
      />
      <EditTemplate />
    </Box>
  );
};

export default EditSchedulingTemplate;
