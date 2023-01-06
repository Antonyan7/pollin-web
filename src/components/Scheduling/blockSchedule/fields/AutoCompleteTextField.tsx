import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const AutoCompleteTextField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const isServiceProvidersLoading = useAppSelector(bookingSelector.isServiceProvidersLoading);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);
  const { control } = useFormContext<IBlockScheduleForm>();

  const { field, fieldState } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, onBlur, value: resourceId, ...fieldProps } = field;
  const { error } = fieldState;

  return (
    <BaseDropdownWithLoading
      isLoading={isServiceProvidersLoading}
      id={fieldName}
      options={optionsGroup}
      onChange={(_, value) => {
        if (value && typeof value === 'object' && 'item' in value) {
          onChange(value.item.id);
        }
      }}
      inputValue={optionsGroup.find((item) => item.item.id === resourceId)?.item.title ?? ''}
      isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
      getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
      groupBy={(option) => option.firstLetter}
      onBlur={onBlur}
      clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
      renderInputProps={{
        label: fieldLabel,
        helperText: error?.message ?? '',
        error: !!error?.message,
        ...fieldProps
      }}
      popupIcon={<KeyboardArrowDownIcon color="primary" />}
    />
  );
};

export default AutoCompleteTextField;
