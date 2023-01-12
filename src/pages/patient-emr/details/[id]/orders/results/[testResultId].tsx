import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import TestResultDetails from '@components/TestResultDetails';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { margins } from 'themes/themeConstants';
import { format } from 'util';

const TestResultDetailsPage = () => {
  const router = useRouter();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const testResultId = router.query.testResultId as string;
  const { t } = useTranslation();

  useEffect(() => {
    if (router.query.id) {
      dispatch(patientsMiddleware.getPatientProfile(router.query.id as string));
    }
  }, [router.query.id]);

  useEffect(() => {
    if (!currentPatientId && router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [currentPatientId, router.query.id]);

  return (
    <Box>
      <MainBreadcrumb
        currentPage={t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_TITLE)}
        navigation={{
          basePath: '/',
          items: [
            { name: t(Translation.PAGE_PATIENT_LIST_TITLE_EMR), path: '/patient-emr/list' },
            { name: patientProfile?.title, path: `/patient-emr/details/${currentPatientId}/orders/results` },
            {
              name: t(Translation.PAGE_PATIENT_ORDER_RESULTS_DETAILS_TITLE),
              path: `/patient-emr/details/${currentPatientId}/orders/results/${testResultId}`
            }
          ]
        }}
      />
      <Card sx={{ marginTop: margins.top20 }}>
        <CardHeader
          title={
            patientProfile?.title && (
              <Stack direction="row" alignItems="center">
                <IconButton
                  color="primary"
                  onClick={() => router.push(`/patient-emr/details/${currentPatientId}/orders/results`)}
                >
                  <ArrowBackIos fontSize="small" />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                  {format(t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT), `${patientProfile?.title}`)}
                </Typography>
              </Stack>
            )
          }
        />
        <Divider />
        <CardContent>
          <TestResultDetails />
        </CardContent>
        <Divider />
        <CardActions />
      </Card>
    </Box>
  );
};

export default TestResultDetailsPage;
