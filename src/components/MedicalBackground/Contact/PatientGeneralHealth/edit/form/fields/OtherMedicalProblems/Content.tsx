import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const MedicalPropblemContent = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.MedicalProblems}.items.${titleIndex}.id`,
    control
  });

  return (
    <Grid item container direction="column" gap={3} padding={paddings.all20}>
      <Grid>
        <TextField
          color="primary"
          fullWidth
          label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_MEDICAL_PROBLEM)}
          {...field}
          value={field.value}
          ref={field.ref}
        />
      </Grid>
    </Grid>
  );
};

export default MedicalPropblemContent;
