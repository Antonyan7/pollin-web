import React, { PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const PatientContributionWrapper = ({ children }: PropsWithChildren) => (
  <Grid px={paddings.leftRight32} py={paddings.topBottom16} xs={12} gap={4} container item direction="column">
    {children}
  </Grid>
);

export default PatientContributionWrapper;
