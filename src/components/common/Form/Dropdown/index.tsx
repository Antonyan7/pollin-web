import React, { FC, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { IDropdownOption } from '@axios/patientEmr/managerPatientEmrTypes';
import { getDropdownByType, getDropdownOption } from '@components/MedicalBackground/helpers';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { KeyboardArrowDown } from '@mui/icons-material';
import { iconButtonClasses } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { DropdownProps } from '../types';

export const Dropdown: FC<DropdownProps> = ({ fieldName = '', label = '', dropdownType = '', additionalLabel }) => {
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const options = getDropdownByType(dropdownOptions, dropdownType)?.options;

  const selected = getDropdownOption(dropdownOptions, dropdownType, fieldProps.value);

  const errorHelperText = generateErrorMessage(label);

  return (
    <BaseDropdownWithLoading
      isLoading={isDropdownsLoading}
      options={options as IDropdownOption[]}
      popupIcon={<KeyboardArrowDown />}
      onChange={(_, value) => {
        if (value && typeof value === 'object' && 'id' in value) {
          onChange(value.id);
        }
      }}
      value={selected}
      disableClearable
      getOptionLabel={(option) => (typeof option === 'object' ? `${option.title} ${additionalLabel ?? ''}` : option)}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInputProps={{
        helperText: fieldState?.error && errorHelperText,
        error: Boolean(fieldState?.error),
        ...fieldProps,
        label
      }}
    />
  );
};

interface StaticDropdownProps extends DropdownProps {
  options: {
    id: string;
    title: string;
  }[];
}

export const StaticDropdown: FC<StaticDropdownProps> = ({ fieldName = '', options, label = '', additionalLabel }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;

  const selected = options.find((option) => option.id === fieldProps.value);

  const errorHelperText = generateErrorMessage(label);

  return (
    <BaseDropdownWithLoading
      isLoading={false}
      sx={{
        [`.${iconButtonClasses.root}`]: {
          color: (theme) => theme.palette.primary.main
        }
      }}
      options={options as IDropdownOption[]}
      popupIcon={<KeyboardArrowDown />}
      onChange={(_, value) => {
        if (value && typeof value === 'object' && 'id' in value) {
          onChange(value.id);
        }
      }}
      value={selected}
      disableClearable
      getOptionLabel={(option) => (typeof option === 'object' ? `${option.title} ${additionalLabel ?? ''}` : option)}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInputProps={{
        helperText: fieldState?.error && errorHelperText,
        error: Boolean(fieldState?.error),
        ...fieldProps,
        label
      }}
    />
  );
};

export const DropdownMultiple: FC<DropdownProps> = ({ fieldName = '', label = '', dropdownType = '' }) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const isDropdownsLoading = useAppSelector(patientsSelector.isDropdownsLoading);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const options = getDropdownByType(dropdownOptions, dropdownType)?.options;

  const selected = fieldProps.value.map((item: IDropdownOption) =>
    getDropdownOption(dropdownOptions, dropdownType, item?.id)
  );

  const errorHelperText = generateErrorMessage(label);

  useScrollIntoView(dropdownRef, fieldState);

  return (
    <BaseDropdownWithLoading
      isLoading={isDropdownsLoading}
      options={options as IDropdownOption[]}
      popupIcon={<KeyboardArrowDown />}
      onChange={(_, value) => {
        if (value && Array.isArray(value)) {
          onChange(value.map((item) => ({ id: item?.id })));
        }
      }}
      value={selected}
      multiple
      getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderInputProps={{
        helperText: fieldState?.error && errorHelperText,
        error: Boolean(fieldState?.error),
        ...fieldProps,
        inputRef: dropdownRef,
        label
      }}
    />
  );
};
