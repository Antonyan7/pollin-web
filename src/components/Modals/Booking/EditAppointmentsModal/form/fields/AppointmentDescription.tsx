import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

import { IFormValues } from '../types';

const AppointmentDescription = () => {
  const [t] = useTranslation();
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const descriptionFieldName = 'appointment.description';
  const { control } = useFormContext<IFormValues>();
  const { field, fieldState } = useController<IFormValues>({
    name: descriptionFieldName,
    control
  });
  const editDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION);
  const editDescriptionLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION;

  const { error } = fieldState;

  useEffect(() => {
    if (field.value && !(details?.appointment?.description === field.value)) {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(false));
    } else {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(true));
    }
  }, [details?.appointment?.description, field.value]);

  return (
    <Grid item xs={12}>
      <TextField
        data-cy={editDescriptionLabelCyId}
        id={descriptionFieldName}
        label={editDescriptionLabel}
        placeholder={editDescriptionLabel}
        rows={4}
        fullWidth
        multiline
        {...field}
        inputProps={{ maxLength }}
        error={!!error?.message}
        helperText={error?.message}
      />
    </Grid>
  );
};

export default AppointmentDescription;
