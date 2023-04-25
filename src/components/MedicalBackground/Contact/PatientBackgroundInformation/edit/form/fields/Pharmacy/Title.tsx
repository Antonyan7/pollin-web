import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationFormSubTitle } from '@components/MedicalBackground/components/common';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

const PharmacyTitle = () => {
  const [t] = useTranslation();
  const { setValue, getValues } = useFormContext();
  const pharmacyValue = getValues(BackgroundInformationFormFields.Pharmacy);

  const onMinusClick = () => {
    setValue(BackgroundInformationFormFields.Pharmacy, {
      ...pharmacyValue,
      pharmacyName: '',
      address: {
        ...pharmacyValue.address,
        street: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
        faxNumber: '',
        unit: ''
      }
    });
  };

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <ConsultationFormSubTitle>
        {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_PHARMACY)}
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

export default PharmacyTitle;
