import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationFormSubTitle } from '@components/MedicalBackground/components/common';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

const ReferringDoctorTitle = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({
    name: BackgroundInformationFormFields.ReferringDoctor,
    control
  });
  const { onChange, value: referringDoctorValue } = field;
  const onMinusClick = () => {
    onChange({
      ...referringDoctorValue,
      value: false,
      name: ''
    });
  };

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <ConsultationFormSubTitle>
        {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_REFERRING_PHYSICIAN_NAME)}
      </ConsultationFormSubTitle>
      <DeleteOutlineIcon
        onClick={onMinusClick}
        sx={{
          color: (theme) => theme.palette.primary.main,
          '&:hover': {
            cursor: 'pointer'
          }
        }}
      />
    </Grid>
  );
};

export default ReferringDoctorTitle;
