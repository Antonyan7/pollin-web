import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, List, ListItem, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import CircularLoading from '@ui-component/circular-loading';

import StyledTooltip from './StyledTooltip';
import { TestHistoryHintProps } from './types';

const TestHistoryTooltipContent = ({ testResultId }: Omit<TestHistoryHintProps, 'children'>) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const testResultsHistory = useAppSelector(patientsSelector.testResultsHistory);
  const isTestResultsHistoryLoading = useAppSelector(patientsSelector.isTestResultsHistoryLoading);
  const testResultHistoryNoTrendsLabel = t(Translation.MODAL_TEST_RESULT_HISTORY_NO_TRENDS);

  useEffect(() => {
    const shouldFetchTestResult = testResultId && currentPatientId;

    if (shouldFetchTestResult) {
      dispatch(patientsMiddleware.getProfileTestResultsHistory(currentPatientId, testResultId));
    }

    return () => {
      dispatch(patientsMiddleware.cleanTestResultsHistory());
    };
  }, [currentPatientId, testResultId]);

  if (isTestResultsHistoryLoading) {
    return (
      <Grid pr={paddings.right32} width={205}>
        <CircularLoading
          loadingProps={{
            sx: {
              color: theme.palette.common.white
            }
          }}
        />
      </Grid>
    );
  }

  return (
    <Stack width={205}>
      {testResultsHistory === null || !testResultsHistory?.items?.length ? (
        <Typography variant="body1">{testResultHistoryNoTrendsLabel}</Typography>
      ) : (
        <Stack py={paddings.topBottom4}>
          <Typography fontSize={theme.typography.pxToRem(14)} color={theme.palette.common.white}>
            {testResultsHistory.widgetTitle}
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: paddings.left24,
              py: paddings.topBottom0
            }}
          >
            {testResultsHistory.items.map(({ title }, key) => (
              <ListItem
                key={key} // eslint-disable-line react/no-array-index-key
                color={theme.palette.common.white}
                sx={{
                  display: 'list-item',
                  fontSize: theme.typography.pxToRem(14),
                  px: paddings.leftRight0,
                  py: paddings.topBottom2
                }}
              >
                {title}
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </Stack>
  );
};

const TestHistoryHint: React.FC<TestHistoryHintProps> = ({ children, testResultId }) => (
  <StyledTooltip placement="bottom-start" title={<TestHistoryTooltipContent testResultId={testResultId} />}>
    {children}
  </StyledTooltip>
);

export default TestHistoryHint;
