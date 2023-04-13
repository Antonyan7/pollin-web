import {
  IFemalePatientGynaecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryProps,
  IFertilityHistoryProps,
  IMedicalBackgroundFieldValuesWithItems,
  IPreviousPregnancies,
  PreviousTreatmentFieldProps
} from '@axios/patientEmr/managerPatientEmrTypes';

import { FlexibleItemType } from '../../common/Form/types';
import { MedicalFormRadioValues } from '../Contact/PatientGeneralHealth/edit/types';

export interface CustomAccessorItem
  extends PreviousTreatmentFieldProps,
    IFemalePatientGynaecologicalHistoryProps,
    IMedicalBackgroundFieldValuesWithItems {}

type Mapper = Record<string, MapperProps>;

export interface MapperProps {
  title: string;
  customAccessor?: (item: CustomAccessorItem) => string[] | string;
  componentData?: {
    type?: FlexibleItemType;
  };
  shouldShowDash?: boolean;
}

export const createObjectWithTitle = (itemTitle: string) => ({
  title: itemTitle
});

export const getLabelBySelectedValue = (isItTrue: boolean, shouldShowDash?: boolean) => {
  if (shouldShowDash && !isItTrue) {
    return '-';
  }

  return isItTrue ? MedicalFormRadioValues.Yes : MedicalFormRadioValues.No;
};

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

        const { title, customAccessor, componentData, shouldShowDash } = mappingPattern[itemId] ?? {};

        const isBoolean = typeof itemData?.value === 'boolean' || itemData?.value === null;
        const currentItemValue = isBoolean ? getLabelBySelectedValue(itemData?.value, shouldShowDash) : itemData.value;

        const finalValue = typeof customAccessor === 'function' ? customAccessor(itemData) : currentItemValue;

        return {
          title,
          viewValue: finalValue ?? getLabelBySelectedValue(false),
          ...itemData,
          fieldName: itemId,
          ...(componentData && {
            componentData
          })
        };
      })
    : [];
