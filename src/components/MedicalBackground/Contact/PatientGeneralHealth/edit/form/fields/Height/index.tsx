import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import Feet from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/Height/fields/Feet';
import Inches from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/Height/fields/Inches';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

const FieldHeight = () => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const height = generalHealth?.height;
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!height?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="flex-start" xs={12}>
        <Grid
          item
          container
          xs={5}
          direction="row"
          alignItems="flex-start"
          flexWrap="nowrap"
          gap={2}
          sx={{
            marginTop: margins.top12
          }}
        >
          <ConsultationTitleWithIcon
            onClick={onNoteClick}
            description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_HEIGHT)}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" spacing={height?.isEditable ? 2 : 0} xs={7}>
          {height?.isEditable ? (
            <>
              <Feet />
              <Inches />
            </>
          ) : (
            <Typography>{height?.inches}</Typography>
          )}
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={GeneralHealthFormFields.Height}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldHeight;
