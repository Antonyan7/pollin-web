import * as React from 'react';
import { FC } from 'react';
import { IPatientPlan, IPatientPlansStatus } from '@axios/patientEmr/managerPatientEmrTypes';
import SeparatedLabels from '@components/SeparatedLabels';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';

import usePlansActions from '@hooks/contextMenu/usePlansActions';
import { ContextMenu } from '@ui-component/contextMenu';

const findStatus = (statuses: IPatientPlansStatus[], currentStatusId: string) =>
  statuses.find((status) => status.status === currentStatusId);

interface PlanRowProps {
  plan: IPatientPlan;
}

const PlanRow: FC<PlanRowProps> = ({ plan }) => {
  const statusVariations = useAppSelector(patientsSelector.statusVariations);
  const status = findStatus(statusVariations, plan.status);

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
          <IconButton size="small" color="primary">
            <KeyboardArrowRight />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PlanRow;
