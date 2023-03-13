import { PreviousTreatmentFieldProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { createObjectWithTitle, getLabelByBoolean } from '../helpers/mapper';

const mappingPattern = {
  isTryingForPregnancy: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_TRYING_FOR_PREGNANCY)
  ),
  ovulationTracking: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_OVULATION_TRACKING)
  ),
  monthsConceiving: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_MONTHS_CONCEIVING)
  ),
  ovulationIntercourse: createObjectWithTitle(
    t(
      Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_OVULATION_KIT_TIMED_INTERCOURSE
    )
  ),
  usingLubricants: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_LUBRICANTS)
  ),
  seenFertilitySpecialist: createObjectWithTitle(
    t(
      Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_PREVIOUS_FERTILITY_SPECIALIST
    )
  ),
  previousTreatment: {
    ...createObjectWithTitle(
      t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_PREVIOUS_FERTILITY_TREATMENT
      )
    ),
    customAccessor: (item: PreviousTreatmentFieldProps) => {
      const values = item.treatments.map((treatment) => `${treatment.type}; ${treatment.cycles}`);
      const finalValues = [getLabelByBoolean(item.exists), ...values];

      return finalValues;
    }
  }
};

export default mappingPattern;
