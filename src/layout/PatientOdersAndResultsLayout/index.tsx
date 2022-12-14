import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import PatientEmrLayout from 'layout/PatientEmrLayout';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';

const PatientOdersAndResultsSubLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const router = useRouter();

  const patientId = router.query.id;

  const { t } = useTranslation();

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string) => {
    router.push(value);
  };

  return (
    <PatientEmrLayout>
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
              backgroundColor: theme.palette.dark[200]
            }
          }}
        >
          <Tab value={`/patient-emr/details/${patientId}/orders`} label={t(Translation.PAGE_PATIENT_ORDER_TITLE)} />
          <Tab
            value={`/patient-emr/details/${patientId}/orders/results`}
            label={t(Translation.PAGE_PATIENT_ORDER_RESULTS_TITLE)}
          />
        </Tabs>
        <Box mt={4}>{children}</Box>
      </Box>
    </PatientEmrLayout>
  );
};

export default PatientOdersAndResultsSubLayout;
