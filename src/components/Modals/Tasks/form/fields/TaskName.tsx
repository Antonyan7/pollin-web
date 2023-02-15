import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const TaskNameField = () => {
  const { register } = useFormContext();
  const [t] = useTranslation();

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        {...register('taskName')}
        label={t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_TASK_NAME_PLACEHOLDER)}
      />
    </Grid>
  );
};

export default TaskNameField;
