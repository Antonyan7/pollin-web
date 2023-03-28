import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import { Translation } from 'constants/translations';

import EditModeContent from './edit';
import ViewModeContent from './view';

const FertilityHistory = () => {
  const [t] = useTranslation();
  const fertilityHistoryTitle = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_TITLE
  );

  return (
    <MedicalBackgroundCard
      title={fertilityHistoryTitle}
      ViewModeContent={ViewModeContent}
      EditModeContent={EditModeContent}
    />
  );
};

export default FertilityHistory;
