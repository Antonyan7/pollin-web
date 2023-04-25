import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationFormSubTitle } from '@components/MedicalBackground/components/common';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

const FamilyDoctorTitle = () => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext();
  const familyDoctorValue = getValues(BackgroundInformationFormFields.FamilyDoctor);
  const onMinusClick = () => {
    setValue(BackgroundInformationFormFields.FamilyDoctor, {
      ...familyDoctorValue,
      familyDoctorName: ''
    });
  };

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <ConsultationFormSubTitle>
        {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_FAMILY_PHYSICIAN)}
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

export default FamilyDoctorTitle;
