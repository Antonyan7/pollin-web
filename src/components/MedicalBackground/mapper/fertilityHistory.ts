import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { Translation } from 'constants/translations';
import { t } from 'i18next';

import { FlexibleItemType, IComponentData } from '../../common/Form/types';
import { createObjectWithTitle, CustomAccessorItem, getLabelBySelectedValue } from '../helpers/mapper';

interface IMappingPattern {
  [key: string]: {
    title: string;
    componentData?: IComponentData;
  };
}

const mappingPattern = {
  isTryingForPregnancy: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_TRYING_FOR_PREGNANCY)
  ),
  ovulationTracking: createObjectWithTitle(
    t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_OVULATION_TRACKING)
  ),
  monthsConceiving: {
    ...createObjectWithTitle(
      t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_MONTHS_CONCEIVING)
    ),
    componentData: {
      type: FlexibleItemType.Dropdown,
      dropdownType: DropdownOptionType.MonthsConceiving
    }
  },
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
    customAccessor: (item: CustomAccessorItem) => {
      const values = item.treatments.map((treatment) => {
        const separator = treatment.type ? ';' : '';
        const cycles = `${treatment.cycles} ${t(
          Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_FERTILITY_TREATMENT_CYCLES
        ).toLowerCase()}`;

        return `${treatment.type}${separator} ${cycles}`;
      });
      const finalValues = [getLabelBySelectedValue(item.exist), ...values];

      return finalValues;
    },
    componentData: {
      type: FlexibleItemType.Section,
      rows: [
        [
          {
            fieldName: 'type',
            label: t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_FERTILITY_TREATMENT_TYPE
            ),
            type: FlexibleItemType.Input
          },
          {
            fieldName: 'cycles',
            label: t(
              Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_FERTILITY_TREATMENT_CYCLES
            ),
            dropdownType: DropdownOptionType.FertilityTreatmentCycles,
            type: FlexibleItemType.Dropdown
          }
        ]
      ],
      tableTitle: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_FERTILITY_TREATMENT
      ),
      controlFieldName: 'exist',
      itemsFieldName: 'treatments',
      addNewItemButtonLabel: t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FERTILITY_HISTORY_FERTILITY_TREATMENT_ADD_BTN_LABEL
      )
    }
  }
} as IMappingPattern;

export default mappingPattern;
