import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { borders } from 'themes/themeConstants';
import { validateInputChange } from 'validation/validationHelpers';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { IFormValues } from '../types';

const ServiceType = () => {
  const { control } = useFormContext<IFormValues>();

  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const isServiceTypesLoading = useAppSelector(bookingSelector.isServiceTypesLoading);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();

  const serviceTypeIdFieldName = 'serviceType.id';
  const { field, fieldState } = useController<IFormValues>({
    name: serviceTypeIdFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const { isTouched, error } = fieldState;

  const serviceTypeIdHelperText = (isTouched ? error?.message : '') ?? '';
  const isServiceTypeError = !!error?.message && isTouched;
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_SELECT_SERVICE_TYPE);

  const defaultServiceTypeOption = useMemo(
    () => serviceTypeOptions.find((option) => option.item.id === fieldProps.value) ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={isServiceTypesLoading}
        ListboxProps={{
          style: { maxHeight: 260, borderRadius: '8px', border: `${borders.solid2px}` }
        }}
        id="serviceType"
        onChange={(_, value) => {
          onChange(value?.item.id);
        }}
        defaultValue={defaultServiceTypeOption}
        isOptionEqualToValue={(option, value) => option.item.id === value?.item.id}
        options={serviceTypeOptions}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.item.title}
        onBlur={onBlur}
        onInputChange={(event, value, reason) => onChange(validateInputChange(event, value, reason))}
        renderInputProps={{
          label: serviceTypeSelectLabel,
          helperText: serviceTypeIdHelperText,
          error: isServiceTypeError,
          ...fieldProps
        }}
      />
    </Grid>
  );
};

export default ServiceType;
