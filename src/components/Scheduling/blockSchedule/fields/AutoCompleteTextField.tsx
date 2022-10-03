import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const AutoCompleteTextField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);
  const { control, formState } = useFormContext<IBlockScheduleForm>();
  const { touchedFields, errors } = formState;

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;

  return (
    <Autocomplete
      id={fieldName}
      options={optionsGroup}
      onChange={(_, value) => {
        onChange(value?.item.id);
      }}
      isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
      getOptionLabel={(option) => option.item.title}
      groupBy={(option) => option.firstLetter}
      onBlur={onBlur}
      onInputChange={(event, value, reason) => onChange(validateInputChange(event, value, reason))}
      renderInput={(params: TextFieldProps) => (
        <TextField
          {...params}
          label={fieldLabel}
          helperText={(touchedFields[fieldName] ? errors[fieldName]?.message : '') ?? ''}
          error={Boolean(errors[fieldName]?.message) && touchedFields[fieldName]}
          {...fieldProps}
        />
      )}
      popupIcon={<KeyboardArrowDownIcon />}
    />
  );
};

export default AutoCompleteTextField;
