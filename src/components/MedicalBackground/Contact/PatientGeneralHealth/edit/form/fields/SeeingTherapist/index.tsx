import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import MedicalComponentWithRadioView from '@components/MedicalBackground/components/common/MedWithRadioView';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const SeeingTherapist = () => {
  const fieldName = `${GeneralHealthFormFields.SeeingTherapist}.value`;
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const seeingTherapist = generalHealth?.seeingTherapist;
  const field = defineSingleFieldValue(seeingTherapist?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_SEEING_THERAPIST);

  return seeingTherapist?.isEditable ? (
    <MedicalComponentWithRadio iconTitle={fieldTitle} fieldName={fieldName} />
  ) : (
    <MedicalComponentWithRadioView iconTitle={fieldTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );
};

export default SeeingTherapist;
