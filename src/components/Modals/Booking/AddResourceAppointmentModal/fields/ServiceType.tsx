import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
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

const ServiceType = () => {
  const { control } = useFormContext<ICreateAppointmentBody>();
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
  const { onChange, onBlur, ...fieldProps } = field;
  const { error } = fieldState;
  const serviceTypeIdHelperText = error?.message;
  const serviceTypeErrorText = !!error?.message;
  const theme = useTheme();

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
        id={serviceTypeIdFieldName}
        onChange={(_, value) => value && typeof value === 'object' && 'item' in value && onChange(value.item.id)}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        options={serviceTypeOptions}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        renderInputProps={{
          ...fieldProps,
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
