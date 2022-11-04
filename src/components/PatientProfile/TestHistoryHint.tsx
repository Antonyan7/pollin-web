import React, { useEffect } from 'react';
import { Box, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { MUIStyledCommonProps, styled } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import ListLayout from 'components/PatientProfile/Layout/List';
import { paddings } from 'themes/themeConstants';

import { IListLayoutItem } from './types';

interface TestHistoryHintProps extends MUIStyledCommonProps {
  testResultId: string;
  children: React.ReactElement;
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: theme.palette.primary.main,
    marginLeft: '10%'
  }
}));

const TestHistoryTooltipContent = ({ testResultId }: Omit<TestHistoryHintProps, 'children'>) => {
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const testResultsHistory = useAppSelector(patientsSelector.testResultsHistory);

  useEffect(() => {
    if (testResultId && currentPatientId) {
      dispatch(patientsMiddleware.getProfileTestResultsHistory(currentPatientId, testResultId));
    }
  }, [testResultId, currentPatientId]);

  return (
    testResultsHistory && (
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
    )
  );
};

const TestHistoryHint: React.FC<TestHistoryHintProps> = ({ children, testResultId }) => (
  <StyledTooltip placement="bottom-start" title={<TestHistoryTooltipContent testResultId={testResultId} />}>
    {children}
  </StyledTooltip>
);

export default TestHistoryHint;
