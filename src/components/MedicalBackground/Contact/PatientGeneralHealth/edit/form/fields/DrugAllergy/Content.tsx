import React from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '@components/MedicalBackground/components/common/TextFieldInput';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const DrugAllergyContent = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY);

  return (
    <Grid item container direction="column" gap={3} padding={paddings.all20}>
      <InputField
        label={label}
        fieldName={`${GeneralHealthFormFields.DrugAllergies}.items.${titleIndex}.title`}
        index={titleIndex}
      />
    </Grid>
  );
};

export default DrugAllergyContent;
