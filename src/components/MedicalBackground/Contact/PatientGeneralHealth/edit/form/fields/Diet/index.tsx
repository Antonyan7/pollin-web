import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const Diet = () => {
  const [t] = useTranslation();
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DIET);
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.Diet}.value`,
    control
  });

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="center" xs={12}>
        <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon description={fieldLabel} />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" xs={7}>
          <TextField color="primary" fullWidth label={fieldLabel} {...field} value={field.value} ref={field.ref} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Diet;
