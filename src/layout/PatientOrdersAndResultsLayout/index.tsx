import React, { PropsWithChildren } from 'react';
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

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string) => {
    router.push(value);
  };

  return (
    <Box sx={{ marginTop: margins.top16 }}>
      <Tabs
        value={router.asPath}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            height: 3,
            backgroundColor: theme.palette.primary.main
          }
        }}
      >
        <Tab value={`/patient-emr/details/${patientId}/orders`} label={t(Translation.PAGE_PATIENT_ORDER_TITLE)} />
        <Tab
          value={`/patient-emr/details/${patientId}/orders/results`}
          label={t(Translation.PAGE_PATIENT_ORDER_RESULTS_TITLE)}
        />
      </Tabs>
      <Box pt={paddings.top24}>{children}</Box>
    </Box>
  );
};

export default EmrOrdersAndResultsTabs;
