import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const AppointmentDescription = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<ICreateAppointmentBody>();

  const descriptionFieldName = 'description';
  const addDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION);
  const addDescriptionCyId = CypressIds.MODAL_APPOINTMENTS_ADD_DESCRIPTION;

  const { field, fieldState } = useController({ control, name: descriptionFieldName });
  const { error } = fieldState;

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        data-cy={addDescriptionCyId}
        fullWidth
        id={descriptionFieldName}
        label={addDescriptionLabel}
        name={descriptionFieldName}
        rows={4}
        placeholder={addDescriptionLabel}
        multiline
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default AppointmentDescription;
