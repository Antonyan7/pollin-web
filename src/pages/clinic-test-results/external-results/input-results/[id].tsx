import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import InputResults from '@components/Results/InputResults';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const InputResultsPage = () => {
  const [t] = useTranslation();

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_INPUT_RESULTS_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            {
              name: t(Translation.PAGE_RESULTS_TITLE),
              path: '/clinic-test-results/external-results'
            },
            {
              name: t(Translation.PAGE_INPUT_RESULTS_TITLE),
              path: '/clinic-test-results/external-results/input-results/[id]'
            }
          ]
        }}
      />
      <InputResults />
    </Box>
  );
};

export default InputResultsPage;
