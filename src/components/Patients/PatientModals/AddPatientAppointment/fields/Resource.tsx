import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const ResourceField = () => {
  const [t] = useTranslation();
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);
  const fieldLabel = t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE);
  const fieldName = 'providerId';
  const { control } = useFormContext<ICreateAppointmentBody>();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const { error } = fieldState;
  const providerIdHelperText = error?.message;
  const providerIdErrorText = !!error?.message;
  const { onChange, onBlur, value: providerId, ...fieldProps } = field;

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <BaseDropdownWithLoading
          isLoading={false}
          id={fieldName}
          options={optionsGroup}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'item' in value) {
              onChange(value.item.id);
            }
          }}
          inputValue={optionsGroup.find((item) => item.item.id === providerId)?.item.title ?? ''}
          isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
          getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
          groupBy={(option) => option.firstLetter}
          onBlur={onBlur}
          clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
          renderInputProps={{
            ...fieldProps,
            label: fieldLabel,
            helperText: providerIdHelperText,
            error: providerIdErrorText
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default ResourceField;
