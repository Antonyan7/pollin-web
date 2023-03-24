import React, { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import { defaultResource } from '@components/Scheduling/applySchedule/constants/defaultValues';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/system';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const ResourceField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { control } = useFormContext<IBlockScheduleForm>();

  const { field, fieldState } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const theme = useTheme();
  const { onChange, onBlur, value: resourceId, ...fieldProps } = field;
  const { error } = fieldState;

  const groupedResourceProviders = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const isGroupedResourceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);

  const resourceProviderCurrentPage = groupedResourceProviders.currentPage;

  const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
    if (resourceItem) {
      onChange(resourceItem.id);
    } else {
      onChange({ ...defaultResource });
    }
  };

  const { resourceFieldInputValue, resourceFieldOptions } = useMemo(() => {
    const adaptedGroupedOptions = groupedResourceProviders.providers.flatMap((provider) =>
      (provider?.items ?? []).map((option) => ({ ...option, type: provider.groupTitle }))
    );

    return {
      resourceFieldInputValue: adaptedGroupedOptions.find((fieldOption) => fieldOption.id === resourceId)?.title ?? '',
      resourceFieldOptions: adaptedGroupedOptions
    };
  }, [resourceId, groupedResourceProviders.providers]);

  const onResourceProviderScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const eventTarget = event.target as HTMLDivElement;

    if (eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight) {
      if (groupedResourceProviders.pageSize * resourceProviderCurrentPage <= groupedResourceProviders.totalItems) {
        const newPage = resourceProviderCurrentPage + 1;

        dispatch(bookingMiddleware.getNewGroupedServiceProviders({ page: newPage }));
      }
    }
  };

  return (
    <BaseDropdownWithLoading
      isLoading={isGroupedResourceProvidersLoading}
      PopperComponent={GroupedServiceProvidersPopper}
      inputValue={resourceFieldInputValue}
      popupIcon={<KeyboardArrowDownIcon color="primary" />}
      onChange={(_event, resourceProvider) => {
        if (resourceProvider) {
          onSelectResourceUpdate(resourceProvider as IServiceProvider);
        }
      }}
      ListboxProps={{
        onScroll: (event) => onResourceProviderScroll(event),
        style: {
          borderRadius: `${borderRadius.radius8}`,
          border: `${borders.solid2px} ${theme.palette.primary.main}`
        }
      }}
      id="scheduling-grouped-service-provider-dropdown"
      onBlur={onBlur}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={resourceFieldOptions}
      getOptionLabel={(itemResource) => (typeof itemResource === 'object' ? itemResource.title : itemResource)}
      groupBy={(resourceOption) => resourceOption.type}
      clearIcon={<CloseIcon onClick={() => onSelectResourceUpdate(null)} fontSize="small" />}
      renderInputProps={{
        label: fieldLabel,
        helperText: error?.message ?? '',
        error: !!error?.message,
        value: resourceId ?? '',
        ...fieldProps
      }}
    />
  );
};

export default ResourceField;
