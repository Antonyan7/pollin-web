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
