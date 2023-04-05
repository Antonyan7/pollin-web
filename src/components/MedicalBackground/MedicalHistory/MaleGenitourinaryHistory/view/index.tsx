import React from 'react';
import { genitourinaryRows } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const MaleGenitourinaryHistoryView = () => (
  <Grid py={paddings.topBottom24}>
    {genitourinaryRows.map(({ Component }, componentIndex) => (
      <Component key={v4()} componentIndex={componentIndex} />
    ))}
  </Grid>
);

export default MaleGenitourinaryHistoryView;
