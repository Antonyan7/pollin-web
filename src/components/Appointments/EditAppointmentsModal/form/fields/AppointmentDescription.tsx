import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';

const AppointmentDescription = () => {
  const [t] = useTranslation();
  const { handleChange, values }: FormikValues = useFormikContext();

  const descriptionFieldName = 'description';
  const descriptionValue = values[descriptionFieldName];
  const editDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_DESCRIPTION);

  return (
    <Grid item xs={12}>
      <TextField
        id={descriptionFieldName}
        label={editDescriptionLabel}
        name={descriptionFieldName}
        placeholder={editDescriptionLabel}
        value={descriptionValue}
        onChange={handleChange}
        rows={4}
        fullWidth
        multiline
      />
    </Grid>
  );
};

export default AppointmentDescription;
