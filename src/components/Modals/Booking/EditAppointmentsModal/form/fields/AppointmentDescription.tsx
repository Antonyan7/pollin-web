import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

import { IFormValues } from '../types';

const AppointmentDescription = () => {
  const [t] = useTranslation();

  const descriptionFieldName = 'appointment.description';
  const { control } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({
    name: descriptionFieldName,
    control
  });
  const editDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION);

  return (
    <Grid item xs={12}>
      <TextField
        id={descriptionFieldName}
        label={editDescriptionLabel}
        placeholder={editDescriptionLabel}
        rows={4}
        fullWidth
        multiline
        {...field}
      />
    </Grid>
  );
};

export default AppointmentDescription;
