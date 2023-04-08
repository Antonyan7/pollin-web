import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ActiveConsults = () => {
  const [t] = useTranslation();
  const fieldName = GeneralHealthFormFields.ActiveConsultsList;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const activeConsults = generalHealth?.activeConsultsList;
  const field = defineSingleFieldValue(activeConsults?.value);
  const activeConsultsTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ACTIVE_CONSULTS_LIST);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!activeConsults?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <MedicalComponentWithRadio
      field={field}
      isEditable={activeConsults?.isEditable}
      showNote={showAdditionalNote}
      iconTitle={activeConsultsTitle}
      fieldName={fieldName}
      onNoteClick={onNoteClick}
    />
  );
};

export default ActiveConsults;
