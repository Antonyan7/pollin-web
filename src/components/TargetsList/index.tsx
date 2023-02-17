import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export interface TargetsListProps {
  label: string;
  values: string[];
}

const TargetsList: FC<TargetsListProps> = ({ label, values }) => (
  <Grid>
    {values.map((listValue) => (
      <Stack direction="row" spacing={1}>
        <Typography variant="h5" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="h5">{listValue}</Typography>
      </Stack>
    ))}
  </Grid>
);

export default TargetsList;
