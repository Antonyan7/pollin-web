import React from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import OhipNumber from './fields/OhipNumber';
import VersionCode from './fields/VersionCode';

const OHIPContent = () => (
  <Grid item container direction="row" justifyContent="space-between" spacing={2} p={paddings.all16}>
    <OhipNumber />
    <VersionCode />
  </Grid>
);

export default OHIPContent;
