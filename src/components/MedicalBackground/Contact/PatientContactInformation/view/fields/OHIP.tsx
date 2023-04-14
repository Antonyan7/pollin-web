import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderMappedNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { MedicalFormTitleYes } from '@components/MedicalBackground/components/common/MedWithItemsView';
import { NoTitleView } from '@components/MedicalBackground/Contact/PatientGeneralHealth/view/fields/NoTitleView';
import { GeneralHealthComponentsProps, isDashString } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const OHIP = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const fieldValue = contactInformation?.OHIP;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_OHIP);
  const isVersioCodeHidden = isDashString(fieldValue?.versionCode);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <Grid item container xs={5} justifyContent="flex-start" direction="column">
        {!isVersioCodeHidden ? (
          <>
            <MedicalFormTitleYes />
            <Grid py={paddings.leftRight8}>{`${fieldValue?.number}; ${fieldValue?.versionCode}`}</Grid>
            <RenderMappedNote note={fieldValue?.note} />
          </>
        ) : (
          <NoTitleView note={fieldValue?.note} />
        )}
      </Grid>
    </FieldWrapper>
  );
};

export default OHIP;
