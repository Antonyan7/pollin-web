import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const AppointmentDescription = ({ edit }: { edit?: boolean }) => {
  const [t] = useTranslation();
  const { control } = useFormContext<ICreateAppointmentBody>();

  const descriptionFieldName = 'description';
  const descriptionLabel = t(
    edit ? Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION : Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION
  );
  const descriptionCyId = edit
    ? CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION
    : CypressIds.MODAL_APPOINTMENTS_ADD_DESCRIPTION;

  const { field, fieldState } = useController({ control, name: descriptionFieldName });
  const { error } = fieldState;

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        data-cy={descriptionCyId}
        fullWidth
        id={descriptionFieldName}
        label={descriptionLabel}
        name={descriptionFieldName}
        rows={4}
        placeholder={descriptionLabel}
        multiline
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default AppointmentDescription;
