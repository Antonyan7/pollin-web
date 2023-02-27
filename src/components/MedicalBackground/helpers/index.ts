/* eslint-disable no-restricted-syntax */

import { IGeneralHealthProps } from '@axios/patientEmr/managerPatientEmrTypes';

interface HealthListRowProps {
  note: string;
  isEditable: boolean;
  value?: string | boolean | { id: string }[];
  exists?: boolean;
  items?: { id: string }[];
  inches?: string;
}

interface HealthListSubRowProps {
  id: string;
  dateOfSurgery?: string;
  typeOfSurgery?: string;
  name?: string;
  dosage?: string;
  title?: string;
  familyMemberName?: string;
}

export const mappedGeneralHealthData = (data: IGeneralHealthProps | null) => {
  if (data) {
    const healthValues = Object.values(data);

    const refactoredHealthData = healthValues
      .map((healthRowType) => healthRowType as HealthListRowProps)
      .map((healthListRow) => ({
        note: healthListRow.note,
        value: healthListRow.value ?? healthListRow.items ?? healthListRow.inches,
        isEditable: healthListRow.isEditable
      }))
      .map((listRowValue) => ({
        ...(Array.isArray(listRowValue.value) && listRowValue.value.length
          ? {
              ...listRowValue,
              value: listRowValue.value
                .map((healthSubListType) => healthSubListType as HealthListSubRowProps)
                .map((subItemRow) => ({
                  ...(subItemRow.id ? { id: subItemRow.id } : {}),
                  ...(subItemRow.dateOfSurgery
                    ? { id: `${subItemRow.typeOfSurgery} - ${subItemRow.dateOfSurgery}` }
                    : {}),
                  ...(subItemRow.name && subItemRow.dosage ? { id: `${subItemRow.name} - ${subItemRow.dosage}` } : {}),
                  ...(subItemRow.title && subItemRow.dosage
                    ? { id: `${subItemRow.title} - ${subItemRow.dosage}` }
                    : {}),
                  ...(subItemRow.title && subItemRow.familyMemberName
                    ? { id: `${subItemRow.title} - ${subItemRow.familyMemberName}` }
                    : {}),
                  ...(subItemRow.title && Object.values(subItemRow).length === 1 ? { id: subItemRow.title } : {})
                }))
            }
          : { ...listRowValue })
      }));

    return refactoredHealthData;
  }

  return null;
};

export const showFalsyResult = (condition: boolean, falsyResult: string, initial?: string | boolean) =>
  condition ? falsyResult : initial;

// eslint-disable-next-line @typescript-eslint/ban-types
export type RecordedHealthType = Record<string, unknown>;

export const mergeObjects = <T extends RecordedHealthType, U extends RecordedHealthType>(
  newData: T,
  oldData: U
): T & U => {
  const result = { ...newData, ...oldData } as T & U;

  for (const key in oldData) {
    if (Object.prototype.hasOwnProperty.call(oldData, key)) {
      if (typeof oldData[key] === 'object' && oldData[key] !== null && !Array.isArray(oldData[key])) {
        result[key] = mergeObjects(newData[key] as RecordedHealthType, oldData[key] as RecordedHealthType) as (T &
          U)[Extract<keyof U, string>];
      } else {
        result[key as keyof T & keyof U] = oldData[key] as T[keyof T & string] & U[keyof U & string];
      }
    }
  }

  return result;
};
