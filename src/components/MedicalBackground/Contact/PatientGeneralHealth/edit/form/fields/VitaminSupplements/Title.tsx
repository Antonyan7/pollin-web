import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useVitaminSupplementsContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useVitaminSupplementsContext';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const VitaminSupplementsTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: vitaminSupplements, remove } = useVitaminSupplementsContext();
  const { getValues, setValue } = useFormContext();
  const vitaminSupplementField = getValues(GeneralHealthFormFields.VitaminSupplements);
  const onMinusClick = (selectedIndex: number) => {
    if (vitaminSupplements.length === 1) {
      setValue(GeneralHealthFormFields.VitaminSupplements, {
        ...vitaminSupplementField,
        items: [
          {
            title: '',
            dosage: ''
          }
        ]
      });
    } else {
      remove(selectedIndex);
    }
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      titleIndex={titleIndex}
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENT)}
    />
  );
};

export default VitaminSupplementsTitle;
