import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const ResourceField = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const groupedResourceProviders = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const isGroupedResourceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  const [serviceProviderCurrentPage, setServiceProviderCurrentPage] = useState<number>(1);

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

  const adaptedGroupedOptions = () =>
    groupedResourceProviders.providers.flatMap((provider) =>
      provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
    );
  const providerFieldOptions = adaptedGroupedOptions();

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
    dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
  }, []);

  const onServiceProviderScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const serviceProviderDropdown = event.target as HTMLDivElement;

    if (
      serviceProviderDropdown.scrollHeight - Math.round(serviceProviderDropdown.scrollTop) ===
      serviceProviderDropdown.clientHeight
    ) {
      if (groupedResourceProviders.pageSize * serviceProviderCurrentPage <= groupedResourceProviders.totalItems) {
        setServiceProviderCurrentPage(serviceProviderCurrentPage + 1);
        dispatch(bookingMiddleware.getNewGroupedServiceProviders({ page: serviceProviderCurrentPage }));
      }
    }
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <BaseDropdownWithLoading
          isLoading={isGroupedResourceProvidersLoading}
          id={fieldName}
          options={providerFieldOptions}
          onChange={(_, value) => {
            if (value && typeof value === 'object' && 'id' in value) {
              onChange(value.id);
            }
          }}
          ListboxProps={{
            style: {
              border: `${borders.solid2px} ${theme.palette.primary.main}`,
              borderRadius: borderRadius.radius12
            },
            onScroll: (event) => onServiceProviderScroll(event)
          }}
          PopperComponent={GroupedServiceProvidersPopper}
          value={providerFieldOptions.find((item) => item.id === providerId)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
          groupBy={(option) => option.type}
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
