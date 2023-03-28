import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import { Translation } from 'constants/translations';

import EditModeContent from './edit';
import ViewModeContent from './view';

const FemalePregnancyInformation = () => {
  const [t] = useTranslation();
  const femalePregnancyInformationTitle = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GTPAETALS_TITLE
  );

  return (
    <MedicalBackgroundCard
      title={femalePregnancyInformationTitle}
      ViewModeContent={ViewModeContent}
      EditModeContent={EditModeContent}
    />
  );
};

export default FemalePregnancyInformation;
