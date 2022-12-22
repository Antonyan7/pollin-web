import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const AppointmentDescription = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<ICreateAppointmentBody>();

  const descriptionFieldName = 'description';
  const addDescriptionLabel = t(Translation.MODAL_PATIENT_APPOINTMENTS_SELECT_DESCRIPTION);
  const { field } = useController({ control, name: descriptionFieldName });

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={descriptionFieldName}
        label={addDescriptionLabel}
        rows={4}
        inputProps={{ maxLength }}
        placeholder={addDescriptionLabel}
        multiline
      />
    </Grid>
  );
};

export default AppointmentDescription;
