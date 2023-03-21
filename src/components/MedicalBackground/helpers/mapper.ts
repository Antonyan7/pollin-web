import {
  IFemalePatientGynaecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryCycleLength,
  IFemalePatientMenstrualCycleHistoryProps,
  IFertilityHistoryProps,
  IPreviousPregnancies,
  PreviousTreatmentFieldProps
} from '@axios/patientEmr/managerPatientEmrTypes';

import { MedicalBackgroundItemType } from '../components/types';
import { MedicalFormRadioValues } from '../Contact/PatientGeneralHealth/edit/types';

export interface CustomAccessorItem
  extends PreviousTreatmentFieldProps,
    IFemalePatientMenstrualCycleHistoryCycleLength,
    IFemalePatientGynaecologicalHistoryProps {}

type Mapper = Record<string, MapperProps>;

export interface MapperProps {
  title: string;
  customAccessor?: (item: CustomAccessorItem) => string[] | string;
  componentData?: {
    type?: MedicalBackgroundItemType;
  };
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
  | IFemalePatientGynaecologicalHistoryProps
  | null;

export const mapObjectByPattern = (target: MappingTarget, mappingPattern: Mapper) =>
  target
    ? Object.entries(target).map((item) => {
        const itemId = item[0];
        const itemData = item[1];
        const { title, customAccessor, componentData } = mappingPattern[itemId];
        const currentItemLabeledValue = getLabelByBoolean(itemData?.value);
        const currentItemValue =
          typeof itemData?.value === 'boolean' || itemData?.value === null ? currentItemLabeledValue : itemData.value;

        const finalValue = typeof customAccessor === 'function' ? customAccessor(itemData) : currentItemValue;

        return {
          title,
          viewValue: finalValue ?? getLabelByBoolean(false),
          ...itemData,
          fieldName: itemId,
          ...(componentData && {
            componentData
          })
        };
      })
    : [];
