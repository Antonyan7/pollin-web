import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

const FoodAllergyContent = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FOOD_ALLERGY);
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.FoodAllergies}.items.${titleIndex}.title`,
    control
  });
  const errorHelperText = generateErrorMessage(`${label} ${titleIndex + 1}`);

  return (
    <Grid item container direction="column" gap={3} padding={paddings.all20}>
      <Grid>
        <TextField
          color="primary"
          fullWidth
          label={label}
          helperText={fieldState?.error && errorHelperText}
          error={Boolean(fieldState?.error)}
          {...field}
          value={field.value}
          ref={field.ref}
        />
      </Grid>
    </Grid>
  );
};

export default FoodAllergyContent;
