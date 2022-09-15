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
  const addDescriptionLabel = t(Translation.MODAL_APPOINTMENTS_ADD_DESCRIPTION);

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        id={descriptionFieldName}
        label={addDescriptionLabel}
        name={descriptionFieldName}
        rows={4}
        placeholder={addDescriptionLabel}
        value={descriptionValue}
        onChange={handleChange}
        multiline
      />
    </Grid>
  );
};

export default AppointmentDescription;
