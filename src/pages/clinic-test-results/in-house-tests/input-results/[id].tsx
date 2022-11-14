import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import InputResults from '@components/Results/InputResults';
import { InputResultTestType } from '@components/Results/InputResults/types';
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
              name: t(Translation.PAGE_IN_HOUSE_TITLE),
              path: '/clinic-test-results/in-house-tests'
            },
            {
              name: t(Translation.PAGE_INPUT_RESULTS_TITLE),
              path: '/clinic-test-results/in-house-tests/input-results/[id]'
            }
          ]
        }}
      />
      <InputResults testType={InputResultTestType.InHouse} />
    </Box>
  );
};

export default InputResultsPage;
