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

const ActiveConsults = () => {
  const [t] = useTranslation();
  const fieldName = `${GeneralHealthFormFields.ActiveConsultsList}.value`;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const activeConsults = generalHealth?.activeConsultsList;
  const field = defineSingleFieldValue(activeConsults?.value);
  const activeConsultsTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ACTIVE_CONSULTS_LIST);

  return activeConsults?.isEditable ? (
    <MedicalComponentWithRadio iconTitle={activeConsultsTitle} fieldName={fieldName} />
  ) : (
    <MedicalComponentWithRadioView iconTitle={activeConsultsTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );
};

export default ActiveConsults;
