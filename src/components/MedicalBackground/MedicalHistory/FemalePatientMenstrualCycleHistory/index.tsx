import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundCard from '@components/MedicalBackground/layout';
import { Translation } from 'constants/translations';

import EditModeContent from './edit';
import ViewModeContent from './view';

const FemalePatientMenstrualCycleHistory = () => {
  const [t] = useTranslation();
  const femalePatientMenstrualCycleHistoryTitle = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_TITLE
  );

  return (
    <MedicalBackgroundCard
      title={femalePatientMenstrualCycleHistoryTitle}
      ViewModeContent={ViewModeContent}
      EditModeContent={EditModeContent}
    />
  );
};

export default FemalePatientMenstrualCycleHistory;
