import * as React from 'react';
import { FC } from 'react';
import { IPatientPlan, IPatientPlansStatus } from '@axios/patientEmr/managerPatientEmrTypes';
import SeparatedLabels from '@components/SeparatedLabels';
import { KeyboardArrowDown, MoreVertOutlined } from '@mui/icons-material';
import { Chip, IconButton, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';

const findStatus = (statuses: IPatientPlansStatus[], currentStatusId: string) =>
  statuses.find((status) => status.status === currentStatusId);

interface PlanRowProps {
  plan: IPatientPlan;
}

const PlanRow: FC<PlanRowProps> = ({ plan }) => {
  const statusVariations = useAppSelector(patientsSelector.statusVariations);
  const status = findStatus(statusVariations, plan.status);

  return (
    <Paper
      elevation={2}
      sx={{
        py: paddings.topBottom18,
        px: paddings.left16
      }}
    >
      <Stack direction="row" display="flex" justifyContent="space-between">
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
          {/* TODO actions */}
          <IconButton size="small" disabled>
            <MoreVertOutlined />
          </IconButton>
          <IconButton size="small" color="primary">
            <KeyboardArrowDown />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PlanRow;
