import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';

const PriorityField = () => {
  const [t] = useTranslation();
  const { control, register } = useFormContext();
  const taskPriorities = useAppSelector(tasksSelector.tasksPrioritiesList);

  const priorityFieldName = 'priority';
  const priorityLabel = t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_PRIORITY_PLACEHOLDER);
  const { field } = useController({ control, name: priorityFieldName });

  return (
    <Grid item xs={12}>
      <TextField {...field} fullWidth select label={priorityLabel} {...register(priorityFieldName)}>
        {taskPriorities.map((priority) => (
          <MenuItem value={priority.id} key={priority.id}>
            {priority.title}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

export default PriorityField;
