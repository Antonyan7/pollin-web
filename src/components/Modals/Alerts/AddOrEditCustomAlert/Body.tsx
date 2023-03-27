import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const Body = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const titleField = useController({ control, name: 'title' }).field;
  const descriptionField = useController({ control, name: 'description' }).field;
  const { ...titleFieldProps } = titleField;
  const { ...descriptionFieldProps } = descriptionField;

  return (
    <Grid container spacing={2} sx={{ maxHeight: '400px', minWidth: '500px', overflowY: 'auto' }}>
      <Grid item xs={12}>
        <TextField
          {...titleFieldProps}
          inputProps={{ maxLength: 50 }}
          label={t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_FIELD)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...descriptionFieldProps}
          label={t(Translation.MODAL_ADD_OR_EDIT_PATIENT_ALERT_DESCRIPTION)}
          fullWidth
          minRows={4}
          inputProps={{ maxLength: 300 }}
          multiline
        />
      </Grid>
    </Grid>
  );
};

export default Body;
