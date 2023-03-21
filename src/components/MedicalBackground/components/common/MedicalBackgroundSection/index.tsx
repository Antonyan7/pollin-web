import React, { FC, useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { IMedicalBackgroundItem } from '../../types';
import MedicalBackgroundTable from '../MedicalBackgroundTable';
import MedicalFormAddDiagram from '../MedicalFormAddDiagram';
import MedicalComponentWithRadio from '../MedWithRadio';

interface MedicalBackgroundSectionProps {
  fieldName: string;
  controlFieldName: string;
  itemsFieldName: string;
  title: string;
  tableTitle: string;
  rows: IMedicalBackgroundItem[][];
  addNewItemButtonLabel?: string;
}

const MedicalBackgroundSection: FC<MedicalBackgroundSectionProps> = ({
  fieldName,
  controlFieldName,
  title,
  tableTitle,
  itemsFieldName,
  addNewItemButtonLabel,
  rows
}) => {
  const parentFieldName = `${fieldName}.${itemsFieldName}`;
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: parentFieldName
  });

  const isExists = useWatch({
    name: `${fieldName}.${controlFieldName}`
  });

  const initialFields = useMemo(
    () =>
      rows.flat().reduce((previousValues, currentValue) => {
        previousValues[currentValue.fieldName] = '';

        return previousValues;
      }, {} as Record<string, string>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    remove(index);
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
