import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/system';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

interface ResourceFieldProps {
  fieldName: string;
  fieldLabel: string;
  fieldCyId?: string;
  popupIcon?: ReactNode;
}

const SharedResourceField = ({ fieldName, fieldLabel, fieldCyId, popupIcon }: ResourceFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const theme = useTheme();
  const { onChange, onBlur, value: resourceId, ...fieldProps } = field;
  const { error } = fieldState;
  const providerIdHelperText = error?.message;
  const providerIdErrorText = !!error?.message;
  const groupedResourceProviders = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const isGroupedResourceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  const [serviceProviderCurrentPage, setServiceProviderCurrentPage] = useState<number>(1);

  const providerFieldOptions = useMemo(
    () =>
      groupedResourceProviders.providers.flatMap((provider) =>
        provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
      ),
    [groupedResourceProviders]
  );

  useEffect(() => {
    dispatch(bookingMiddleware.getGroupedServiceProviders({ page: 1 }));
  }, []);

  const onServiceProviderScroll = useCallback(
    (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
      const serviceProviderDropdown = event.target as HTMLDivElement;

      if (
        serviceProviderDropdown.scrollHeight - Math.round(serviceProviderDropdown.scrollTop) ===
        serviceProviderDropdown.clientHeight
      ) {
        if (groupedResourceProviders.pageSize * serviceProviderCurrentPage <= groupedResourceProviders.totalItems) {
          setServiceProviderCurrentPage(serviceProviderCurrentPage + 1);
          dispatch(bookingMiddleware.getGroupedServiceProviders({ page: serviceProviderCurrentPage }));
        }
      }
    },
    [groupedResourceProviders, serviceProviderCurrentPage, setServiceProviderCurrentPage]
  );

  return (
    <BaseDropdownWithLoading
      isLoading={isGroupedResourceProvidersLoading}
      id={fieldCyId}
      options={providerFieldOptions}
      onChange={(_, value) => {
        if (value && typeof value === 'object' && 'id' in value) {
          onChange(value.id);
        }
      }}
      ListboxProps={{
        onScroll: onServiceProviderScroll,
        style: {
          borderRadius: `${borderRadius.radius8}`,
          border: `${borders.solid2px} ${theme.palette.primary.main}`
        }
      }}
      PopperComponent={GroupedServiceProvidersPopper}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
      groupBy={(resourceOption) => resourceOption.type}
      onBlur={onBlur}
      clearIcon={<CloseIcon onClick={() => onChange(null)} fontSize="small" />}
      popupIcon={popupIcon}
      renderInputProps={{
        ...fieldProps,
        label: fieldLabel,
        helperText: providerIdHelperText,
        error: providerIdErrorText
      }}
      data-cy={fieldCyId}
    />
  );
};

export default SharedResourceField;
