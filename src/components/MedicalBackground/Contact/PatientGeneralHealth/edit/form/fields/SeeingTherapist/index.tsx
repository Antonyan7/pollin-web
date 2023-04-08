import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const SeeingTherapist = () => {
  const fieldName = GeneralHealthFormFields.SeeingTherapist;
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const seeingTherapist = generalHealth?.seeingTherapist;
  const field = defineSingleFieldValue(seeingTherapist?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_SEEING_THERAPIST);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!seeingTherapist?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={seeingTherapist?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={fieldTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default SeeingTherapist;
