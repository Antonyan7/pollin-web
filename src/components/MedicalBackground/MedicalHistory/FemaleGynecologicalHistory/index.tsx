import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import { Translation } from 'constants/translations';

import EditModeContent from './editModeContent';
import ViewModeContent from './viewModeContent';

const FemaleGynecologicalHistory = () => {
  const [t] = useTranslation();
  const femaleGynecologicalHistoryTitle = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNECOLOGICAL_HISTORY_TITLE
  );

  return (
    <MedicalBackgroundCard
      title={femaleGynecologicalHistoryTitle}
      ViewModeContent={ViewModeContent}
      EditModeContent={EditModeContent}
    />
  );
};

export default FemaleGynecologicalHistory;
