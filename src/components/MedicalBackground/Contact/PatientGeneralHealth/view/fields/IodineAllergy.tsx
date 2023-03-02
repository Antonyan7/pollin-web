import React from 'react';
import { useTranslation } from 'react-i18next';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { defineSingleFieldValue, GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const IodineAllergy = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const fieldValue = generalHealth?.iodineAllergy;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_IODINE_ALLERGY);
  const field = defineSingleFieldValue(fieldValue?.value);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex}>
      <Grid item container xs={5} direction="column" justifyContent="space-between">
        <Grid>{field}</Grid>
        <Grid>{fieldValue?.note ?? '-'}</Grid>
      </Grid>
    </FieldWrapper>
  );
};

export default IodineAllergy;
