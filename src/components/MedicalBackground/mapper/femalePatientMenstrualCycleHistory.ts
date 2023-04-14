import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { FlexibleItemType } from '../../common/Form/types';
import { createObjectWithTitle } from '../helpers/mapper';

const mappingPattern = {
  hasPeriod: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_HAS_PERIOD)
  ),
  cycleLength: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_CYCLE_LENGTH)
    ),
    componentData: {
      type: FlexibleItemType.Input
    },
    shouldShowDash: true
  },
  firstDayOfLastPeriod: {
    ...createObjectWithTitle(
      t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_FIRST_DAY_OF_LAST_PERIOD
      )
    ),
    componentData: {
      type: FlexibleItemType.Date
    },
    shouldShowDash: true
  },
  flow: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_FLOW)
    ),
    componentData: {
      type: FlexibleItemType.Dropdown,
      dropdownType: DropdownOptionType.MenstrualFlow
    }
  },
  daysOfBleeding: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_DAYS_OF_BLEEDING)
    ),
    componentData: {
      type: FlexibleItemType.Dropdown,
      dropdownType: DropdownOptionType.DaysOfBleeding,
      additionalLabel: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_DAYS_LABEL
      )
    }
  },
  pain: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_PAIN)
    ),
    componentData: {
      type: FlexibleItemType.Dropdown,
      dropdownType: DropdownOptionType.MenstrualPain
    }
  },
  clots: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_CLOTS)
    )
  },
  symptoms: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_MENSTRUAL_CYCLE_HISTORY_SYMPTOMS)
    )
  }
};

export default mappingPattern;
