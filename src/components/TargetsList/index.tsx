import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { v5 as uuidv5 } from 'uuid';

export interface TargetsListProps {
  label: string;
  values: string[];
}

const TargetsList: FC<TargetsListProps> = ({ label, values }) => (
  <Grid>
    {values.map((listValue, index) => (
      <Stack direction="row" spacing={1} key={uuidv5(JSON.stringify(listValue).concat(index.toString()), uuidv5.URL)}>
        <Typography variant="h5" fontWeight={500}>
          {label}
        </Typography>
        <Typography variant="h5">{listValue}</Typography>
      </Stack>
    ))}
  </Grid>
);

export default TargetsList;
