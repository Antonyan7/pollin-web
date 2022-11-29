import React, { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Main } from '@components/Appointments/AppointmentsContent';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Link } from '@components/index';
import { Tab, TabProps, Tabs, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

const TabWithLink = (props: TabProps<typeof Link, { component: typeof Link }>) => <Tab {...props} />;

const SpecimensTrackingLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent<Element, Event>, currentIndex: number) => {
    setCurrentTabIndex(currentIndex);
  };

  const label = t(Translation.PAGE_SPECIMENS_TRACKING_TITLE);

  return (
    <>
      <MainBreadcrumb
        currentPage={label}
        navigation={{
          basePath: '/',
          items: [{ name: label, path: '/patient-emr/list' }]
        }}
      />

      <Main sx={{ marginTop: margins.top16 }}>
        <Tabs
          value={currentTabIndex}
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
          <TabWithLink
            component={Link}
            href="/clinic-test-results/specimen-tracking/all-tests"
            label={t(Translation.PAGE_SPECIMENS_TRACKING_ALL_TESTS_TITLE)}
          />
          <TabWithLink
            component={Link}
            href="/clinic-test-results/specimen-tracking/transports"
            label={t(Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_TITLE)}
          />
        </Tabs>
        {children}
      </Main>
    </>
  );
};

export default SpecimensTrackingLayout;
