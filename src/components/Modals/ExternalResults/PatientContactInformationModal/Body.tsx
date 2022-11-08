import React from 'react';
import CheckboxConfirming from '@components/Modals/ExternalResults/PatientContactInformationModal/fields/CheckboxConfirming';
import PatientInformation from '@components/Modals/ExternalResults/PatientContactInformationModal/fields/PatientInformation';
import { Grid } from '@mui/material';

const Body = () => (
  <Grid container spacing={5}>
    <Grid item xs={8}>
      <PatientInformation />
    </Grid>
    <Grid item xs={12}>
      <CheckboxConfirming />
    </Grid>
  </Grid>
);

export default Body;
