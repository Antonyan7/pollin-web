import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { isDashValue } from '@utils/stringUtils';

const Age = () => {
  const [t] = useTranslation();
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const age = patientBackgroundInformation?.age;
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_AGE);
  const { control } = useFormContext();
  const { field } = useController({
    name: `${BackgroundInformationFormFields.Age}.value`,
    control
  });
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!age?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} container item direction="row">
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={1}>
        <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
      </Grid>
      <Grid item container direction="column" gap={2} xs={7} pt={paddings.top12}>
        <Typography>
          {!isDashValue(field?.value)
            ? `${field?.value} ${t(Translation.PAGE_PATIENT_CHECK_IN_VERIFY_MODAL_YEARS)}`
            : field?.value}
        </Typography>
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.Age}
        />
      </Grid>
    </Grid>
  );
};

export default Age;
