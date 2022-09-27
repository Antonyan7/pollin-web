import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { validateInputChange } from 'validation/validationHelpers';

const ServiceType = () => {
  const {
    formState: { touchedFields, errors },
    control
  } = useFormContext<ICreatedAppointmentBody>();
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();

  const serviceTypeIdFieldName = 'serviceTypeId';
  const serviceTypeIdHelperText =
    (touchedFields[serviceTypeIdFieldName] ? errors[serviceTypeIdFieldName]?.message : '') ?? '';
  const isServiceTypeError = !!errors[serviceTypeIdFieldName]?.message && touchedFields[serviceTypeIdFieldName];
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE);
  const {
    field: { onChange, onBlur, ...fieldProps }
  } = useController({
    name: serviceTypeIdFieldName,
    control
  });

  return (
    <Grid item xs={12}>
      <Autocomplete
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
            error={isServiceTypeError}
            required
          />
        )}
      />
    </Grid>
  );
};

export default ServiceType;
