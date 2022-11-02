import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { validateInputChange } from 'validation/validationHelpers';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const AppointmentType = () => {
  const { control } = useFormContext<ICreatedAppointmentBody>();
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();
  const serviceTypeIdFieldName = 'serviceTypeId';
  const resorceFieldName = 'resourceId';
  const serviceTypeSelectLabel = t(Translation.MODAL_PATIENT_APPOINTMENTS_SELECT_SERVICE_TYPE);
  const { field, fieldState } = useController({
    name: serviceTypeIdFieldName,
    control
  });
  const { field: resorceField } = useController({
    name: resorceFieldName
  });
  const { onChange, onBlur, ...fieldProps } = field;
  const { error } = fieldState;
  const serviceTypeIdHelperText = error?.message;
  const serviceTypeErrorText = !!error?.message;
  const theme = useTheme();

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes({ resourceId: resorceField.value }));
  }, [resorceField.value]);

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        isLoading={false}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        disabled={!resorceField.value}
        id={serviceTypeIdFieldName}
        onChange={(_, value) => onChange(value?.item.id)}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        options={serviceTypeOptions}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.item.title}
        onInputChange={(event, value, reason) => onChange(validateInputChange(event, value, reason))}
        renderInputProps={{
          ...fieldProps,
          label: serviceTypeSelectLabel,
          helperText: serviceTypeIdHelperText,
          error: serviceTypeErrorText
        }}
      />
    </Grid>
  );
};

export default AppointmentType;
