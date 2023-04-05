import React from 'react';
import FieldWithNote from '@components/common/FieldWithNote';
import { Typography } from '@mui/material';

import { Dropdown, DropdownMultiple } from '../components/common/Dropdown';
import { FormInput } from '../components/common/FormInput';
import { ControlledDatePicker } from '../components/common/MedicalDatePicker';
import MedicalFormRadio from '../components/common/MedicalFormRadio';
import MedicalComponentWithRadioView from '../components/common/MedWithRadioView';
import { IComponentData, MedicalBackgroundItemType } from '../components/types';

const renderComponents = (mappedItem: {
  isEditable?: boolean;
  viewValue?: string;
  componentData?: IComponentData;
  fieldName: string;
  title: string;
}) => {
  const { fieldName } = mappedItem;
  const { title } = mappedItem;

  if (!mappedItem?.isEditable) {
    return (
      <MedicalComponentWithRadioView iconTitle={title} key={title}>
        <Typography>{mappedItem.viewValue}</Typography>
      </MedicalComponentWithRadioView>
    );
  }

  const componentType = mappedItem?.componentData?.type;

  switch (componentType) {
    case MedicalBackgroundItemType.Dropdown:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={
            <Dropdown
              fieldName={`${fieldName}.value`}
              placeholder={title}
              dropdownType={mappedItem?.componentData?.dropdownType}
              label={title}
            />
          }
          key={fieldName}
        />
      );
    case MedicalBackgroundItemType.Input:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={<FormInput label={title} fieldName={`${fieldName}.value`} />}
          key={fieldName}
        />
      );
    case MedicalBackgroundItemType.Date:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={<ControlledDatePicker fieldName={`${fieldName}.value`} label={title} />}
          key={fieldName}
        />
      );
    case MedicalBackgroundItemType.MultipleSelect:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={
            <DropdownMultiple
              fieldName={`${fieldName}.items`}
              placeholder={title}
              dropdownType={mappedItem?.componentData?.dropdownType}
              label={title}
            />
          }
          key={fieldName}
        />
      );
    default:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={<MedicalFormRadio fieldName={`${fieldName}.value`} />}
          key={fieldName}
        />
      );
  }
};

export default renderComponents;
