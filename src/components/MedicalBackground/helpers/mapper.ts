import {
  IFemalePatientGynecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryCycleLength,
  IFemalePatientMenstrualCycleHistoryProps,
  IFertilityHistoryProps,
  IPreviousPregnancies,
  PreviousTreatmentFieldProps
} from '@axios/patientEmr/managerPatientEmrTypes';

import { MedicalFormRadioValues } from '../Contact/PatientGeneralHealth/edit/types';

export interface CustomAccessorItem
  extends PreviousTreatmentFieldProps,
    IFemalePatientMenstrualCycleHistoryCycleLength,
    IFemalePatientGynecologicalHistoryProps {}

type Mapper = Record<string, MapperProps>;

export interface MapperProps {
  title: string;
  customAccessor?: (item: CustomAccessorItem) => string[] | string;
}

export const createObjectWithTitle = (itemTitle: string) => ({
  title: itemTitle
});

export const getLabelByBoolean = (isItTrue: boolean) =>
  isItTrue ? MedicalFormRadioValues.Yes : MedicalFormRadioValues.No;

type MappingTarget =
  | IPreviousPregnancies
  | IFertilityHistoryProps
  | IFemalePatientMenstrualCycleHistoryProps
  | IFemalePatientGynecologicalHistoryProps
  | null;

export const mapObjectByPattern = (target: MappingTarget, mappingPattern: Mapper) =>
  target
    ? Object.entries(target).map((item) => {
        const itemId = item[0];
        const itemData = item[1];
        const mappingItem = mappingPattern[itemId];
        const currentItemLabeledValue = getLabelByBoolean(itemData?.value);
        const currentItemValue =
          typeof itemData?.value === 'boolean' || itemData?.value === null ? currentItemLabeledValue : itemData.value;

        const finalValue =
          typeof mappingItem?.customAccessor === 'function' ? mappingItem.customAccessor(itemData) : currentItemValue;

        return {
          title: mappingItem.title,
          item: {
            // When there are not any values for field just show NO label.
            value: finalValue ?? getLabelByBoolean(false),
            note: itemData?.note
          }
        };
      })
    : [];
