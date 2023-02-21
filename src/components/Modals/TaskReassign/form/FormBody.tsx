import React from 'react';
import { useTranslation } from 'react-i18next';
import CancelButton from '@components/Modals/TaskReassign/actions/Cancel';
import ReassignButton from '@components/Modals/TaskReassign/actions/Reassign';
import AssignField from '@components/Modals/Tasks/form/fields/Assign';
import DescriptionField from '@components/Modals/Tasks/form/fields/Description';
import PatientField from '@components/Modals/Tasks/form/fields/DisabledPatientField';
import DueDateField from '@components/Modals/Tasks/form/fields/DueDate';
import PriorityField from '@components/Modals/Tasks/form/fields/Priority';
import ReassignNotes from '@components/Modals/Tasks/form/fields/ReassignNotes';
import TaskNameField from '@components/Modals/Tasks/form/fields/TaskName';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

const FormBody = () => {
  const [t] = useTranslation();

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        <TaskNameField disabled />
        <PatientField />
        <DueDateField disabled />
        <DescriptionField disabled />
        <PriorityField disabled />
        <AssignField fieldLabel={t(Translation.PAGE_TASKS_MANAGER_MODAL_REASSIGN_FIELD_REASSIGN) as string} />
        <ReassignNotes />
      </Grid>

      <DialogActions sx={{ p: paddings.all4, marginTop: margins.top4 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={3}>
            <CancelButton />
          </Grid>
          <Grid item xs={3}>
            <ReassignButton />
          </Grid>
        </Grid>
      </DialogActions>
    </DialogContent>
  );
};

export default FormBody;
