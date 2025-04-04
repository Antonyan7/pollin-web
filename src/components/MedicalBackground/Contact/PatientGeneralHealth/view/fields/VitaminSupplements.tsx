import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderMappedNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { MedicalFormTitleYes } from '@components/MedicalBackground/components/common/MedWithItemsView';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

import { NoTitleView } from './NoTitleView';

const VitaminSupplements = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const fieldValue = generalHealth?.vitaminSupplements;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENTS);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <Grid item container xs={5} justifyContent="flex-start" direction="column">
        {fieldValue?.items.length ? (
          <>
            <MedicalFormTitleYes />
            <Grid item container direction="column">
              {fieldValue?.items.map((fieldItem) => (
                <Grid key={v4()} py={paddings.leftRight8}>{`${fieldItem.title}; ${fieldItem.dosage}`}</Grid>
              ))}
              <RenderMappedNote note={fieldValue.note} />
            </Grid>
          </>
        ) : (
          <NoTitleView note={fieldValue?.note} />
        )}
      </Grid>
    </FieldWrapper>
  );
};

export default VitaminSupplements;
