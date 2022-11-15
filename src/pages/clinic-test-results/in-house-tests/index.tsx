import React from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import InHouseSpecimensList from '@components/InHouseTests/InHouseSpecimensList';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';

const InHouseTestResultsPage = () => {
  const [t] = useTranslation();

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_IN_HOUSE_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: t(Translation.PAGE_IN_HOUSE_TITLE), path: '/clinic-test-results/in-house-tests' }]
        }}
      />
      <InHouseSpecimensList />
    </Box>
  );
};

export default InHouseTestResultsPage;
