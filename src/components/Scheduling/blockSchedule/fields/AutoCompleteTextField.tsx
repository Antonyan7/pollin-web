import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const AutoCompleteTextField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);
  const { control, formState } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, onBlur, value: resourceId, ...fieldProps } = field;

  return (
    <Autocomplete
      id={fieldName}
      options={optionsGroup}
      onChange={(_, value) => {
        onChange(value?.item.id);
      }}
      inputValue={optionsGroup.find((item) => item.item.id === resourceId)?.item.title ?? ''}
      isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
      getOptionLabel={(option) => option.item.title}
      groupBy={(option) => option.firstLetter}
      onBlur={onBlur}
      renderInput={(params: TextFieldProps) => (
        <TextField
          {...params}
          label={fieldLabel}
          helperText={errors[fieldName]?.message ?? ''}
          error={Boolean(errors[fieldName]?.message)}
          {...fieldProps}
        />
      )}
      popupIcon={<KeyboardArrowDownIcon color="primary" />}
    />
  );
};

export default AutoCompleteTextField;
