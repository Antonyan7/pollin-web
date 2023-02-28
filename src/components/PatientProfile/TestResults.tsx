import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SecondaryLayout from '@components/PatientProfile/Layout/SecondaryLayout';
import TestResultItem from '@components/PatientProfile/TestResultItem';
import { Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const TestResults = () => {
  const [t] = useTranslation();
  const theme = useTheme();

  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const profileTestResults = useAppSelector(patientsSelector.profileTestResults);
  const isPatientProfileOverviewLoading = useAppSelector(patientsSelector.isPatientProfileOverviewLoading);

  const { testResults = [] } = profileTestResults?.patient ?? {};

  const widgetTitle = t(Translation.PAGE_PATIENT_WIDGET_TEST_RESULTS_TITLE);

  useEffect(() => {
    if (currentPatientId) {
      dispatch(patientsMiddleware.getProfileTestResults(currentPatientId));
    }
  }, [currentPatientId]);

  return (
    <SubCardStyled
      title={widgetTitle}
      titleProps={{
        fontWeight: 600,
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.secondary[800]
      }}
    >
      {testResults.length === 0 ? (
        <SecondaryLayout loading={isPatientProfileOverviewLoading} />
      ) : (
        <Stack px={paddings.leftRight20} py={paddings.topBottom32} gap={margins.topBottom16}>
          {testResults.map(({ title: testResultTitle, items }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Stack direction="row" key={index}>
              <Stack flexBasis="30%">
                <Typography fontWeight="bold" color={theme.palette.secondary[800]}>
                  {testResultTitle}
                </Typography>
              </Stack>
              <Stack flexBasis="10%">:</Stack>
              <Stack gap={margins.topBottom16}>
                {items.map(({ title, type, testTypeId }, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TestResultItem key={key} testTypeId={testTypeId} title={title} type={type} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </SubCardStyled>
  );
};

export default TestResults;
