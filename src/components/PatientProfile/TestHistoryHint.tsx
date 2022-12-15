import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import ListLayout from 'components/PatientProfile/Layout/List';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import StyledTooltip from './StyledTooltip';
import { IListLayoutItem, TestHistoryHintProps } from './types';

const TestHistoryTooltipContent = ({ testResultId }: Omit<TestHistoryHintProps, 'children'>) => {
  const [t] = useTranslation();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const testResultsHistory = useAppSelector(patientsSelector.testResultsHistory);
  const isTestResultsHistoryLoading = useAppSelector(patientsSelector.isTestResultsHistoryLoading);
  const testResultHistoryNoTrendsLabel = t(Translation.MODAL_TEST_RESULT_HISTORY_NO_TRENDS);

  useEffect(() => {
    const shouldFetchTestResult = testResultId && currentPatientId;

    if (shouldFetchTestResult) {
      dispatch(patientsMiddleware.getProfileTestResultsHistory(currentPatientId, testResultId));
    }
  }, [testResultId, currentPatientId]);

  return !testResultsHistory && !isTestResultsHistoryLoading ? (
    <Box
      sx={{
        width: '205px'
      }}
    >
      <Typography variant="body1">{testResultHistoryNoTrendsLabel}</Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: '205px',
        pb: paddings.bottom8
      }}
    >
      <ListLayout
        items={testResultsHistory?.items as IListLayoutItem[]}
        title={testResultsHistory?.widgetTitle}
        renderAsList
        componentProps={{
          list: {
            py: 0,
            px: paddings.leftRight20,
            sx: {
              margin: 0
            }
          },
          title: {
            sx: {
              pt: paddings.top8,
              m: 0
            }
          }
        }}
      />
    </Box>
  );
};

const TestHistoryHint: React.FC<TestHistoryHintProps> = ({ children, testResultId }) => (
  <StyledTooltip placement="bottom-start" title={<TestHistoryTooltipContent testResultId={testResultId} />}>
    {children}
  </StyledTooltip>
);

export default TestHistoryHint;
