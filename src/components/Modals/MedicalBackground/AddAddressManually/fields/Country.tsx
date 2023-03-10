import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddManuallyAddressModalProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const Country = () => {
  const [t] = useTranslation();
  const { control } = useFormContext<AddManuallyAddressModalProps>();

  const countryFieldName = 'country';
  const countryLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_COUNTRY);

  const { field } = useController({ control, name: countryFieldName });

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        fullWidth
        id={countryFieldName}
        label={countryLabel}
        name={countryFieldName}
        placeholder={countryLabel}
        disabled
      />
    </Grid>
  );
};

export default Country;
