import { DropdownOptionType, IMedicalBackgroundFieldValuesWithItems } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { FlexibleItemType } from '../../common/Form/types';
import { createObjectWithTitle, getLabelBySelectedValue } from '../helpers/mapper';

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
      type: FlexibleItemType.Date
    },
    shouldShowDash: true
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
    customAccessor: ({ items }: IMedicalBackgroundFieldValuesWithItems) => {
      const itemIds = items.map(({ id }) => id);

      return [getLabelBySelectedValue(!!items.length), ...itemIds];
    },
    componentData: {
      type: FlexibleItemType.MultipleSelect,
      dropdownType: DropdownOptionType.ProceduresDueToAbnormalPap
    }
  },
  gynaecologicalConditions: {
    ...createObjectWithTitle(
      t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_GYNAECOLOGICAL_CONDITIONS
      )
    ),
    customAccessor: ({ items }: IMedicalBackgroundFieldValuesWithItems) => {
      const itemIds = items.map(({ id }) => id);

      return [getLabelBySelectedValue(!!items.length), ...itemIds];
    },
    componentData: {
      type: FlexibleItemType.MultipleSelect,
      dropdownType: DropdownOptionType.GynaecologicalConditions
    }
  },
  signsOfPCOS: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_SIGNS_OF_PCOS)
    ),
    customAccessor: ({ items }: IMedicalBackgroundFieldValuesWithItems) => {
      const itemIds = items.map(({ id }) => id);

      return [getLabelBySelectedValue(!!items.length), ...itemIds];
    },
    componentData: {
      type: FlexibleItemType.MultipleSelect,
      dropdownType: DropdownOptionType.SignsOfPCOS
    }
  },
  hyperprolactinemia: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_HYPERPROLACTINEMIA)
    ),
    customAccessor: ({ items }: IMedicalBackgroundFieldValuesWithItems) => {
      const itemIds = items.map(({ id }) => id);

      return [getLabelBySelectedValue(!!items.length), ...itemIds];
    },
    componentData: {
      type: FlexibleItemType.MultipleSelect,
      dropdownType: DropdownOptionType.Hyperprolactinemia
    }
  },
  signsOfPOI: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_SIGNS_OF_POI)
    ),
    customAccessor: ({ items }: IMedicalBackgroundFieldValuesWithItems) => {
      const itemIds = items.map(({ id }) => id);

      return [getLabelBySelectedValue(!!items.length), ...itemIds];
    },
    componentData: {
      type: FlexibleItemType.MultipleSelect,
      dropdownType: DropdownOptionType.SignsOfPOI
    }
  },
  breastfeeding: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_BREASTFEEDING)
  ),
  cervixTreatment: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_CERVIX_TREATMENT)
    )
  },
  intercoursePain: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GYNAECOLOGICAL_HISTORY_INTERCOURSE_PAIN)
    )
  }
};

export default mappingPattern;
