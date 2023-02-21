import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const ReassignNotes = () => {
  const [t] = useTranslation();
  const { control, register } = useFormContext();

  const notesFieldName = 'notes';
  const notesLabel = t(Translation.PAGE_TASKS_MANAGER_MODAL_REASSIGN_FIELD_NOTES);
  const { field } = useController({ control, name: notesFieldName });

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        {...register('notes')}
        fullWidth
        id={notesFieldName}
        label={notesLabel}
        rows={4}
        inputProps={{ maxLength }}
        placeholder={notesLabel}
        multiline
      />
    </Grid>
  );
};

export default ReassignNotes;
