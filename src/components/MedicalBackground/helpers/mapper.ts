import { IFertilityHistoryProps, PreviousTreatmentFieldProps } from '@axios/patientEmr/managerPatientEmrTypes';

import { MedicalFormRadioValues } from '../Contact/PatientGeneralHealth/edit/types';

type CustomAccessorItem = PreviousTreatmentFieldProps;

type Mapper = Record<string, MapperProps>;

export interface MapperProps {
  title: string;
  customAccessor?: (item: CustomAccessorItem) => string[];
}

export const createObjectWithTitle = (itemTitle: string) => ({
  title: itemTitle
});

export const getLabelByBoolean = (isItTrue: boolean) =>
  isItTrue ? MedicalFormRadioValues.Yes : MedicalFormRadioValues.No;

export const mapObjectByPattern = (target: IFertilityHistoryProps | null, mappingPattern: Mapper) =>
  target
    ? Object.entries(target).map((item) => {
        const itemId = item[0];
        const itemData = item[1];
        const mappingItem = mappingPattern[itemId];
        const currentItemLabeledValue = getLabelByBoolean(itemData?.value);
        const currentItemValue =
          typeof itemData?.value === 'boolean' || itemData?.value === null ? currentItemLabeledValue : itemData.value;

        return {
          title: mappingItem.title,
          item: {
            value:
              typeof mappingItem?.customAccessor === 'function'
                ? mappingItem.customAccessor(itemData)
                : currentItemValue,
            note: itemData?.note
          }
        };
      })
    : [];
