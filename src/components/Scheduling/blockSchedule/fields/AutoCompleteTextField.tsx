import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { initialValues } from '../form/initialValues';

const AutoCompleteTextField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);
  const { setFieldValue, touched, errors, handleBlur } = useFormikContext<typeof initialValues>();

  return (
    <Autocomplete
      id={fieldName}
      options={optionsGroup}
      onChange={(_, value) => {
        setFieldValue(fieldName, value?.item.id);
      }}
      isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
      getOptionLabel={(option) => option.item.title}
      groupBy={(option) => option.firstLetter}
      onBlur={handleBlur(fieldName)}
      onInputChange={(event, value, reason) => setFieldValue(fieldName, validateInputChange(event, value, reason))}
      renderInput={(params: TextFieldProps) => (
        <TextField
          {...params}
          label={fieldLabel}
          name={fieldName}
          helperText={touched[fieldName] ? errors[fieldName] : ''}
          error={Boolean(errors[fieldName]) && touched[fieldName]}
        />
      )}
      popupIcon={<KeyboardArrowDownIcon />}
    />
  );
};

export default AutoCompleteTextField;
