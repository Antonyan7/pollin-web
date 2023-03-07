import React, { PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins, paddings } from 'themes/themeConstants';

const EmrOrdersAndResultsTabs = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const router = useRouter();

  const patientId = router.query.id;

  const { t } = useTranslation();

  const detectedTabIndex = useMemo(() => (router.asPath.includes('results') ? 1 : 0), [router.asPath]);

  return (
    <Box sx={{ marginTop: margins.top16 }}>
      <Tabs
        value={detectedTabIndex}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: '2px'
          },
          '& .MuiTabs-flexContainer': {
            borderBottom: '2px solid',
            borderColor: theme.palette.primary.light
          }
        }}
      >
        <Tab
          value={0}
          label={t(Translation.PAGE_PATIENT_ORDER_TITLE)}
          onClick={() => router.push(`/patient-emr/details/${patientId}/orders`)}
        />
        <Tab
          value={1}
          label={t(Translation.PAGE_PATIENT_ORDER_RESULTS_TITLE)}
          onClick={() => router.push(`/patient-emr/details/${patientId}/orders/results`)}
        />
      </Tabs>
      <Box pt={paddings.top24}>{children}</Box>
    </Box>
  );
};

export default EmrOrdersAndResultsTabs;
