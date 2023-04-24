import * as React from 'react';
import { FC } from 'react';
import { findStatus } from '@components/Plans/helpers';
import SeparatedLabels from '@components/SeparatedLabels';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { plansSelector } from '@redux/slices/plans';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { IPatientPlan } from 'types/reduxTypes/plansTypes';

import usePlansActions from '@hooks/contextMenu/usePlansActions';
import { ContextMenu } from '@ui-component/contextMenu';

interface PlanRowProps {
  plan: IPatientPlan;
}

const PlanRow: FC<PlanRowProps> = ({ plan }) => {
  const statusVariations = useAppSelector(plansSelector.statusVariations);
  const status = findStatus(statusVariations, plan.status);
  const router = useRouter();
  const { id } = router.query;

  const actionBindings = usePlansActions(plan.id, status?.actions);

  return (
    <Paper
      elevation={2}
      sx={{
        py: paddings.topBottom18,
        px: paddings.left16
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Stack direction="row">
          <SeparatedLabels labels={[plan.title, `${status?.title} on ${plan.date}`]} />
        </Stack>
        <Stack direction="row">
          <Chip
            sx={{
              color: status?.label.textColor ?? '',
              backgroundColor: status?.label.backgroundColor ?? '',
              '&:hover': {
                backgroundColor: status?.label.textColor ?? '',
                color: status?.label.backgroundColor ?? ''
              },
              px: paddings.leftRight36
            }}
            label={status?.title}
          />
          <ContextMenu actionBindings={actionBindings} />
          <IconButton
            size="small"
            color="primary"
            onClick={() => router.push(`/patient-emr/details/${id}/plans/${plan.id}`)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PlanRow;
