import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Feet from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/Height/fields/Feet';
import Inches from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/Height/fields/Inches';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const FieldHeight = () => {
  const [t] = useTranslation();

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="center" xs={12}>
        <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon
            description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_HEIGHT)}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" spacing={2} xs={7}>
          <Feet />
          <Inches />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldHeight;
