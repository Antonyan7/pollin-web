import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';

import StaticDataContext from './context';

const Body = () => {
  const { data } = useContext(StaticDataContext);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{data.explanationMessage}</Typography>
      </Grid>
      {data.actualQuestion && (
        <Grid item xs={12}>
          <Typography variant="subtitle1">{data.actualQuestion}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Body;
