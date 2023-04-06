import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import usePastSurgeryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/usePastSurgeryContext';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const PastSurgeriesTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: pastSurgeries, remove } = usePastSurgeryContext();
  const { getValues, setValue } = useFormContext();
  const pastSurgeryField = getValues(GeneralHealthFormFields.PastSurgeries);
  const onMinusClick = (selectedIndex: number) => {
    if (pastSurgeries.length === 1) {
      setValue(GeneralHealthFormFields.PastSurgeries, {
        ...pastSurgeryField,
        items: [
          {
            typeOfSurgery: '',
            dateOfSurgery: null
          }
        ]
      });
    } else {
      remove(selectedIndex);
    }
  };

  return (
    <DiagramTitle
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY_TITLE)}
      onClick={onMinusClick}
      titleIndex={titleIndex}
    />
  );
};

export default PastSurgeriesTitle;
