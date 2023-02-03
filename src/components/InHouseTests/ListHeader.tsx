import React, { memo } from 'react';
import { Grid } from '@mui/material';

import SpecimenListFilter from './ListFilter';
import SpecimenListSearch from './ListSearch';

const SpecimenListHeader = () => (
  <Grid container spacing={3}>
    <SpecimenListSearch />
    <Grid item xs={12} md={6} lg={6}>
      <SpecimenListFilter />
    </Grid>
  </Grid>
);

export default memo(SpecimenListHeader);
