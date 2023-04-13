import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

import { StaticModalBodyProps } from './types';

const Body: FC<StaticModalBodyProps> = ({ data, dynamicComponent }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="subtitle1">{data.explanationMessage}</Typography>
    </Grid>
    {data.actualQuestion && (
      <Grid item xs={12}>
        <Typography variant="subtitle1">{data.actualQuestion}</Typography>
      </Grid>
    )}
    {dynamicComponent && (
      <Grid item xs={12}>
        {dynamicComponent}
      </Grid>
    )}
  </Grid>
);

export default Body;
