import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import PendingTestResultList from '@components/Results/PendingTestResultList';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const TestResults = () => {
  const [t] = useTranslation();

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_RESULTS_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_RESULTS_TITLE), path: '/clinic-test-results/external-results' }]
        }}
      />
      <PendingTestResultList />
    </Box>
  );
};

export default TestResults;
