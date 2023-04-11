import React, { useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const ServiceType = (props: { isProviderRequired?: boolean }) => {
  const { control } = useFormContext<ICreateAppointmentBody>();
  const { isProviderRequired } = props;
  const serviceTypes = useAppSelector(bookingSelector.serviceTypes);
  const isServiceTypesLoading = useAppSelector(bookingSelector.isServiceTypesLoading);
  const serviceTypeOptions = createOptionsGroup(serviceTypes);
  const [t] = useTranslation();
  const serviceTypeIdFieldName = 'serviceTypeId';
  const serviceTypeSelectLabel = t(Translation.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE);
  const serviceTypeSelectCyId = CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE;
  const { field, fieldState } = useController({
    name: serviceTypeIdFieldName,
    control
  });
  const providerId = useWatch({ name: 'providerId', control });
  const { onChange, onBlur, ref, ...fieldProps } = field;
  const { error } = fieldState;
  const serviceTypeIdHelperText = error?.message;
  const serviceTypeErrorText = !!error?.message;
  const theme = useTheme();
  const serviceTypeValue = useMemo(
    () => serviceTypeOptions.find((option) => option.item.id === fieldProps.value) ?? null,
    [fieldProps.value, serviceTypeOptions]
  );

  return (
    <Grid item xs={12}>
      <BaseDropdownWithLoading
        data-cy={serviceTypeSelectCyId}
        isLoading={isServiceTypesLoading}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        disabled={isProviderRequired && !providerId}
        id={serviceTypeIdFieldName}
        onChange={(_, value) => value && typeof value === 'object' && 'item' in value && onChange(value.item.id)}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        options={serviceTypeOptions}
        ref={ref}
        value={serviceTypeValue}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        renderInputProps={{
          ...fieldProps,
          ref,
          label: serviceTypeSelectLabel,
          name: serviceTypeIdFieldName,
          helperText: serviceTypeIdHelperText,
          error: serviceTypeErrorText
        }}
      />
    </Grid>
  );
};

export default ServiceType;
