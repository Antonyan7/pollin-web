import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Main } from '@components/common/AppointmentsContent';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

const SpecimensTrackingLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const router = useRouter();
  const { t } = useTranslation();

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string) => {
    router.push(value);
  };

  const label = t(Translation.PAGE_SPECIMENS_TRACKING_TITLE);

  return (
    <>
      <MainBreadcrumb
        currentPage={label}
        navigation={{
          basePath: '/',
          items: [{ name: label, path: '/clinic-test-results/specimen-tracking/all-tests' }]
        }}
      />

      <Main sx={{ marginTop: margins.top16 }}>
        <Tabs
          value={router.pathname}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              backgroundColor: theme.palette.dark[200]
            }
          }}
        >
          <Tab
            value="/clinic-test-results/specimen-tracking/all-tests"
            label={t(Translation.PAGE_SPECIMENS_TRACKING_ALL_TESTS_TITLE)}
            data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_ALL_TEST}
          />
          <Tab
            value="/clinic-test-results/specimen-tracking/transports"
            label={t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_TITLE)}
            data-cy={CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_TRANSPORTS}
          />
        </Tabs>
        <Box mt={4}>{children}</Box>
      </Main>
    </>
  );
};

export default SpecimensTrackingLayout;
