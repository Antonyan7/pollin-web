import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, Grid, TextField, TextFieldProps, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { validateInputChange } from 'validation/validationHelpers';

const ServiceType = () => {
  const { control } = useFormContext<ICreatedAppointmentBody>();
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();
  const serviceTypeIdFieldName = 'serviceTypeId';
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE);
  const { field, fieldState } = useController({
    name: serviceTypeIdFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const { error } = fieldState;
  const serviceTypeIdHelperText = error?.message;
  const serviceTypeErrorText = !!error?.message;
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Autocomplete
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        id={serviceTypeIdFieldName}
        onChange={(_, value) => onChange(value?.item.id)}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        options={serviceTypeOptions}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.item.title}
        onInputChange={(event, value, reason) => onChange(validateInputChange(event, value, reason))}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...fieldProps}
            {...params}
            label={serviceTypeSelectLabel}
            name={serviceTypeIdFieldName}
            helperText={serviceTypeIdHelperText}
            error={serviceTypeErrorText}
          />
        )}
      />
    </Grid>
  );
};

export default ServiceType;
