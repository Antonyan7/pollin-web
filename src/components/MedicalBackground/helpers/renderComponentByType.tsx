import React from 'react';
import FieldWithNote from '@components/common/Form/AdvancedField';
import { Dropdown, DropdownMultiple } from '@components/common/Form/Dropdown';
import FormInput from '@components/common/Form/FormInput';
import { FlexibleItemType, IComponentData } from '@components/common/Form/types';
import { Typography } from '@mui/material';

import { ControlledDatePicker } from '../components/common/MedicalDatePicker';
import MedicalFormRadio from '../components/common/MedicalFormRadio';
import MedicalComponentWithRadioView from '../components/common/MedWithRadioView';

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
    case FlexibleItemType.Dropdown:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={
            <Dropdown
              fieldName={`${fieldName}.value`}
              placeholder={title}
              dropdownType={mappedItem?.componentData?.dropdownType}
              additionalLabel={mappedItem?.componentData?.additionalLabel}
              label={title}
            />
          }
          key={fieldName}
        />
      );
    case FlexibleItemType.Input:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={<FormInput label={title} fieldName={`${fieldName}.value`} />}
          key={fieldName}
        />
      );
    case FlexibleItemType.Date:
      return (
        <FieldWithNote
          fieldLabel={title}
          fieldName={fieldName}
          fieldComponent={<ControlledDatePicker fieldName={`${fieldName}.value`} label={title} />}
          key={fieldName}
        />
      );
    case FlexibleItemType.MultipleSelect:
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
