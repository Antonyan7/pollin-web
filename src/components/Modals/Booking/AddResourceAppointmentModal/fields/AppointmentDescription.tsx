import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const AppointmentDescription = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<ICreateAppointmentBody>();

  const descriptionFieldName = 'description';
  const addDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION);

  const { field } = useController({ control, name: descriptionFieldName });

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={descriptionFieldName}
        label={addDescriptionLabel}
        name={descriptionFieldName}
        rows={4}
        placeholder={addDescriptionLabel}
        multiline
      />
    </Grid>
  );
};

export default AppointmentDescription;
