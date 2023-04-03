import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { MedicalBackgroundItemType } from '../components/types';
import { createObjectWithTitle, CustomAccessorItem } from '../helpers/mapper';

const mappingPattern = {
  takingBirthControl: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_TAKING_BIRTH_CONTROL)
  ),
  isOvulating: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_OVULATION)
  ),
  previousPapTest: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_ANY_PREVIOUS_PAP_TEST)
  ),
  papTestLastDate: {
    ...createObjectWithTitle(
      t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_DATE_OF_LAST_PAP_TEST
      )
    ),
    componentData: {
      type: MedicalBackgroundItemType.Date
    }
  },
  abnormalPap: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_ABNORMAL_PAP)
  ),
  hasAbnormalPapProcedures: createObjectWithTitle(
    t(
      Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_PROCEDURES_DUE_TO_ABNORMAL_PAP
    )
  ),
  abnormalPapProcedures: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_INDICATE_PROCEDURES)
    ),
    customAccessor: (item: CustomAccessorItem) => item.abnormalPapProcedures?.items.map(({ id }) => id),
    componentData: {
      type: MedicalBackgroundItemType.MultipleSelect,
      dropdownType: DropdownOptionType.ProceduresDueToAbnormalPap
    }
  },
  gynaecologicalConditions: {
    ...createObjectWithTitle(
      t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_GYNAECOLOGICAL_CONDITIONS
      )
    ),
    customAccessor: (item: CustomAccessorItem) => item.gynaecologicalConditions?.items.map(({ id }) => id),
    componentData: {
      type: MedicalBackgroundItemType.MultipleSelect,
      dropdownType: DropdownOptionType.GynaecologicalConditions
    }
  },
  signsOfPCOS: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_SIGNS_OF_PCOS)
    ),
    customAccessor: (item: CustomAccessorItem) => item.signsOfPCOS?.items.map(({ id }) => id),
    componentData: {
      type: MedicalBackgroundItemType.MultipleSelect,
      dropdownType: DropdownOptionType.SignsOfPCOS
    }
  },
  hyperprolactinemia: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_HYPERPROLACTINEMIA)
    ),
    customAccessor: (item: CustomAccessorItem) => item.hyperprolactinemia?.items.map(({ id }) => id),
    componentData: {
      type: MedicalBackgroundItemType.MultipleSelect,
      dropdownType: DropdownOptionType.Hyperprolactinemia
    }
  },
  signsOfPOI: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_SIGNS_OF_POI)
    ),
    customAccessor: (item: CustomAccessorItem) => item.signsOfPOI?.items.map(({ id }) => id),
    componentData: {
      type: MedicalBackgroundItemType.MultipleSelect,
      dropdownType: DropdownOptionType.SignsOfPOI
    }
  },
  breastfeeding: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_BREASTFEEDING)
  ),
  cervixTreatment: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_CERVIX_TREATMENT)
  ),
  intercoursePain: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_INTERCOURSE_PAIN)
  )
};

export default mappingPattern;
