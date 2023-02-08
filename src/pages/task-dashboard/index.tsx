import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { TaskDashboard } from '@components/TaskDashboard';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const TaskManager = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', borderRadius: '5px' }}>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_TASK_DASHBOARD_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_TASK_DASHBOARD_TITLE), path: '/task-dashboard' }]
        }}
      />
      <TaskDashboard />
    </Box>
  );
};

export default TaskManager;
