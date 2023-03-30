import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { MedicalBackgroundTableRow } from '../../types';
import MedicalBackgroundTable from '../MedicalBackgroundTable';
import MedicalFormAddDiagram from '../MedicalFormAddDiagram';
import MedicalHistoryRadio from '../MedicalHistoryRadioComponent';

interface MedicalBackgroundSectionProps {
  fieldName: string;
  controlFieldName: string;
  itemsFieldName: string;
  title: string;
  tableTitle: string;
  rows: MedicalBackgroundTableRow[];
  addNewItemButtonLabel?: string;
  initialFields: Record<string, string>;
}

const MedicalBackgroundSection: FC<MedicalBackgroundSectionProps> = ({
  fieldName,
  controlFieldName,
  title,
  tableTitle,
  itemsFieldName,
  addNewItemButtonLabel,
  initialFields,
  rows
}) => {
  const parentFieldName = `${fieldName}.${itemsFieldName}`;
  const { control } = useFormContext();
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: parentFieldName
  });

  const isExists = useWatch({
    name: `${fieldName}.${controlFieldName}`
  });

  const handleAddNewItem = () => {
    append(initialFields);
  };

  useEffect(() => {
    if (isExists && fields.length === 0) {
      handleAddNewItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length, isExists]);

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }

    if (fields.length === 1) {
      update(index, initialFields);
    }
  };

  const shouldShowAddNewItemButton = isExists && addNewItemButtonLabel;

  return (
    <MedicalHistoryRadio controlFieldName={controlFieldName} fieldName={fieldName} iconTitle={title}>
      {isExists &&
        fields?.map((field, index) => (
          <MedicalBackgroundTable
            key={field.id}
            onDelete={handleRemove}
            title={`${tableTitle} ${index + 1}`}
            rows={rows}
            parentFieldName={parentFieldName}
            index={index}
          />
        ))}
      {shouldShowAddNewItemButton && (
        <MedicalFormAddDiagram subTitle={addNewItemButtonLabel} onClick={handleAddNewItem} />
      )}
    </MedicalHistoryRadio>
  );
};

export default MedicalBackgroundSection;
