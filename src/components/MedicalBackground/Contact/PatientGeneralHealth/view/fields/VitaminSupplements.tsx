import React from 'react';
import { useTranslation } from 'react-i18next';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const VitaminSupplements = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const fieldValue = generalHealth?.vitaminSupplements;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENTS);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex}>
      <Grid item container xs={5} justifyContent="flex-start" direction="column">
        {fieldValue?.items.length ? (
          <>
            <MedicalFormTitleYes />
            <Grid item container direction="column">
              {fieldValue?.items.map((fieldItem) => (
                <Grid key={v4()} py={paddings.leftRight8}>{`${fieldItem.title}; ${fieldItem.dosage}`}</Grid>
              ))}
              <Grid mt={margins.top16}>{fieldValue.note ?? '-'}</Grid>
            </Grid>
          </>
        ) : (
          <MedicalFormTitleNo />
        )}
      </Grid>
    </FieldWrapper>
  );
};

export default VitaminSupplements;
