import React from 'react';
import { DialogContent, Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { City, Country, PostalCode, Province, StreetAddress, UnitNumber } from '../fields';

const FormBody = () => (
  <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
    <Grid container spacing={3}>
      <StreetAddress />
      <UnitNumber />
      <Province />
      <PostalCode />
      <City />
      <Country />
    </Grid>
  </DialogContent>
);

export default FormBody;
