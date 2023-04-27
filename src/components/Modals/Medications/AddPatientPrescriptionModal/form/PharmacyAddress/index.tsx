import React from 'react';
import { Grid } from '@mui/material';

import City from './fields/City';
import Country from './fields/Country';
import FaxNumber from './fields/FaxNumber';
import PharmacyName from './fields/PharmacyName';
import PhoneNumber from './fields/PhoneNumber';
import PostalCode from './fields/PostalCode';
import SearchPharmacyAddress from './fields/SearchPharmacyAddress';
import StreetAddress from './fields/StreetAddress';
import UnitNumber from './fields/UnitNumber';

const PharmacyAddress = () => (
  <Grid item container xs={12} direction="column" gap={2}>
    <SearchPharmacyAddress />
    <PharmacyName />
    <StreetAddress />
    <UnitNumber />
    <Grid container direction="row" spacing={1}>
      <City />
      <PostalCode />
    </Grid>
    <Country />
    <Grid container direction="row" spacing={1}>
      <FaxNumber />
      <PhoneNumber />
    </Grid>
  </Grid>
);

export default PharmacyAddress;
