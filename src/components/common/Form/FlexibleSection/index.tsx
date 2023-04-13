import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import FieldWithNote from '@components/common/Form/AdvancedField';

import MedicalHistorySectionAddButton from '../../../MedicalBackground/components/common/MedicalHistorySectionAddButton';
import FormRadio from '../Radio';
import { FlexibleSectionTableRow } from '../types';

import FlexibleSectionTable from './table';

interface FlexibleSectionProps {
  fieldName: string;
  controlFieldName: string;
  itemsFieldName: string;
  title: string;
  tableTitle: string;
  rows: FlexibleSectionTableRow[];
  addNewItemButtonLabel?: string;
  initialFields: Record<string, string>;
}

const FlexibleSection: FC<FlexibleSectionProps> = ({
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
    name: controlFieldName
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
    <FieldWithNote fieldName={fieldName} fieldLabel={title} fieldComponent={<FormRadio fieldName={controlFieldName} />}>
      {isExists &&
        fields?.map((field, index) => (
          <FlexibleSectionTable
            key={field.id}
            onDelete={handleRemove}
            title={`${tableTitle} ${index + 1}`}
            rows={rows}
            parentFieldName={parentFieldName}
            index={index}
          />
        ))}
      {shouldShowAddNewItemButton && (
        <MedicalHistorySectionAddButton
          fieldName={parentFieldName}
          subTitle={addNewItemButtonLabel}
          onClick={handleAddNewItem}
          lastFieldIndex={fields.length - 1}
        />
      )}
    </FieldWithNote>
  );
};

export default FlexibleSection;
