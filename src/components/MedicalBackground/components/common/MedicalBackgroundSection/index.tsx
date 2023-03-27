import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { MedicalBackgroundTableRow } from '../../types';
import MedicalBackgroundTable from '../MedicalBackgroundTable';
import MedicalFormAddDiagram from '../MedicalFormAddDiagram';
import MedicalComponentWithRadio from '../MedWithRadio';

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

  const areThereAnyFields = fields.length > 0;

  useEffect(() => {
    if (!isExists) {
      remove();
    } else if (!areThereAnyFields) {
      handleAddNewItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExists, areThereAnyFields]);

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
    <MedicalComponentWithRadio fieldName={`${fieldName}.${controlFieldName}`} iconTitle={title}>
      {fields?.map((field, index) => (
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
    </MedicalComponentWithRadio>
  );
};

export default MedicalBackgroundSection;
