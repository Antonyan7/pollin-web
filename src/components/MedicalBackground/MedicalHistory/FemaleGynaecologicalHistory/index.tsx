import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import { Translation } from 'constants/translations';

import EditModeContent from './edit';
import ViewModeContent from './view';

const FemaleGynaecologicalHistory = () => {
  const [t] = useTranslation();
  const femaleGynaecologicalHistoryTitle = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_TITLE
  );

  return (
    <MedicalBackgroundCard
      title={femaleGynaecologicalHistoryTitle}
      ViewModeContent={ViewModeContent}
      EditModeContent={EditModeContent}
    />
  );
};

export default FemaleGynaecologicalHistory;
