import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/system';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { borderRadius, borders } from 'themes/themeConstants';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import { defaultResource } from '../constants/defaultValues';
import useFieldControl from '../hooks/useFieldControl';
import { ApplyScheduleFields } from '../types';

const ResourceField = () => {
  const [t] = useTranslation();
  const { field, fieldState } = useFieldControl(ApplyScheduleFields.RESOURCE);
  const theme = useTheme();
  const resourceLabel = t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE);
  const resourceCyId = CypressIds.PAGE_SCHEDULING_APPLY_RESOURCE;

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

  const adaptedGroupedOptions = () =>
    groupedResourceProviders.providers.flatMap((provider) =>
      provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
    );
  const resourceFieldOptions = adaptedGroupedOptions();
  const resourceFieldInputValue = useMemo(
    () => resourceFieldOptions.find((fieldOption) => fieldOption.id === resourceId)?.title ?? '',
    [resourceId, resourceFieldOptions]
  );

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
    <ApplyScheduleFormRow title={resourceLabel}>
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
          label: resourceLabel,
          helperText: error?.message ?? '',
          error: !!error?.message,
          value: resourceId.title,
          ...fieldProps
        }}
        data-cy={resourceCyId}
      />
    </ApplyScheduleFormRow>
  );
};

export default ResourceField;
