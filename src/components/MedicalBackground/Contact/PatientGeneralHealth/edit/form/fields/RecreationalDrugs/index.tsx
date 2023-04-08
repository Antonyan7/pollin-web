import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const RecreationalDrugs = () => {
  const [t] = useTranslation();
  const fieldName = GeneralHealthFormFields.RecreationalDrugs;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const recreationalDrugs = generalHealth?.recreationalDrugs;
  const field = defineSingleFieldValue(recreationalDrugs?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_RECREATIONAL_DRUGS);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!recreationalDrugs?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={recreationalDrugs?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={fieldTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default RecreationalDrugs;
