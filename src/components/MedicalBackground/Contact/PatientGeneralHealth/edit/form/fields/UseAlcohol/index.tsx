import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const AlcoholUse = () => {
  const fieldName = GeneralHealthFormFields.DrinkAlcohol;
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const drinkAlcohol = generalHealth?.drinkAlcohol;
  const field = defineSingleFieldValue(drinkAlcohol?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_ALCOHOL);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!drinkAlcohol?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={drinkAlcohol?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={fieldTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default AlcoholUse;
