import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { createObjectWithTitle, CustomAccessorItem } from '../helpers/mapper';

const mappingPattern = {
  hasPeriod: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_HAS_PERIOD)
  ),
  cycleLength: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_CYCLE_LENGTH)
    ),
    customAccessor: (item: CustomAccessorItem) => item.number ?? ''
  },
  firstDayOfLastPeriod: createObjectWithTitle(
    t(
      Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_FIRST_DAY_OF_LAST_PERIOD
    )
  ),
  flow: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_FLOW)
  ),
  daysOfBleeding: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_DAYS_OF_BLEEDING)
  ),
  pain: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_PAIN)
  ),
  clots: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_CLOTS)
  ),
  symptoms: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_SYMPTOMS)
  )
};

export default mappingPattern;
