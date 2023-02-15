import React from 'react';
import ConfirmButton from '@components/Modals/Tasks/form/actions/Confirm';
import AssignField from '@components/Modals/Tasks/form/fields/Assign';
import DescriptionField from '@components/Modals/Tasks/form/fields/Description';
import DueDateField from '@components/Modals/Tasks/form/fields/DueDate';
import PatientField from '@components/Modals/Tasks/form/fields/Patient';
import PriorityField from '@components/Modals/Tasks/form/fields/Priority';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import TaskNameField from './fields/TaskName';

const FormBody = () => (
  <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
    <Grid container spacing={3}>
      <TaskNameField />
      <PatientField />
      <DueDateField />
      <DescriptionField />
      <PriorityField />
      <AssignField />
    </Grid>
    <DialogActions sx={{ p: paddings.all4, marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <ConfirmButton />
      </Grid>
    </DialogActions>
  </DialogContent>
);

export default FormBody;
