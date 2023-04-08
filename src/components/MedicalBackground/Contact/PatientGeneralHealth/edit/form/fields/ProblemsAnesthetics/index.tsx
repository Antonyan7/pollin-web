import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ProblemWithAnesthetics = () => {
  const [t] = useTranslation();
  const fieldName = GeneralHealthFormFields.ProblemWithAnesthetics;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const problemWithAnesthetics = generalHealth?.problemWithAnesthetics;
  const field = defineSingleFieldValue(problemWithAnesthetics?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PROBLEM_WITH_ANESTHETICS);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!problemWithAnesthetics?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={problemWithAnesthetics?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={fieldTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default ProblemWithAnesthetics;
