import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const IodineAllergy = () => {
  const [t] = useTranslation();
  const fieldName = GeneralHealthFormFields.IodineAllergy;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const iodineAllergy = generalHealth?.iodineAllergy;
  const field = defineSingleFieldValue(iodineAllergy?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_IODINE_ALLERGY);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!iodineAllergy?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={iodineAllergy?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={fieldTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default IodineAllergy;
