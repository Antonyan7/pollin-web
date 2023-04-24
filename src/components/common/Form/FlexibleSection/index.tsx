import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';

import { AdvancedFieldType, FieldWithNote, SimpleField } from '../AdvancedField';
import FormRadio from '../Radio';
import { FlexibleSectionTableRow } from '../types';

import MedicalHistorySectionAddButton from './MedicalHistorySectionAddButton';
import FlexibleSectionTable from './table';

interface FlexibleSectionProps {
  fieldName: string;
  controlFieldName: string;
  itemsFieldName?: string;
  type?: AdvancedFieldType;
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
  type,
  initialFields,
  rows
}) => {
  const parentFieldName = itemsFieldName ? `${fieldName}.${itemsFieldName}` : fieldName; // When control & fields are in the same level
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
  const isPlan = type === AdvancedFieldType.Plan;

  return (
    <Box
      component={isPlan ? SimpleField : FieldWithNote}
      fieldName={fieldName}
      fieldLabel={title}
      fieldComponent={<FormRadio fieldName={controlFieldName} />}
      type={type}
    >
      {isExists && (
        <Stack spacing={3}>
          {fields?.map((field, index) => (
            <FlexibleSectionTable
              key={field.id}
              onDelete={handleRemove}
              title={`${tableTitle} ${index + 1}`}
              rows={rows}
              parentFieldName={parentFieldName}
              index={index}
            />
          ))}
        </Stack>
      )}
      {shouldShowAddNewItemButton && (
        <MedicalHistorySectionAddButton
          fieldName={parentFieldName}
          subTitle={addNewItemButtonLabel}
          onClick={handleAddNewItem}
          lastFieldIndex={fields.length - 1}
        />
      )}
    </Box>
  );
};

export default FlexibleSection;
