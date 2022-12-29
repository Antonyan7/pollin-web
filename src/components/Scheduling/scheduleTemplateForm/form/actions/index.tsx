import React from 'react';
import { Grid } from '@mui/material';

import AddNewScheduleTemplateButton from './Buttons/AddNewScheduleTemplateButton';
import CancelButton from './Buttons/Cancel';
import SaveButton from './Buttons/Save';

const Actions = () => (
  <>
    <AddNewScheduleTemplateButton />
    <Grid item xs={12} container justifyContent="flex-end" alignItems="center">
      <CancelButton />
      <SaveButton />
    </Grid>
  </>
);

export default Actions;
