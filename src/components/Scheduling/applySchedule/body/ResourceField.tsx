import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { createOptionsGroup } from 'helpers/berryFunctions';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import useFieldControl from '../hooks/useFieldControl';
import { ApplyScheduleFields } from '../types';

const ResourceField = () => {
  const scheduleResources = useAppSelector(bookingSelector.serviceProvidersList);
  const isServiceProvidersLoading = useAppSelector(bookingSelector.isServiceProvidersLoading);
  const optionsGroup = createOptionsGroup(scheduleResources.providers);

  const [t] = useTranslation();
  const { field, fieldState } = useFieldControl(ApplyScheduleFields.RESOURCE);

  const { onChange, onBlur, value: resourceId, ...fieldProps } = field;
  const { error } = fieldState;
  const resourceLabel = t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE);
  const resourceCyId = CypressIds.PAGE_SCHEDULING_APPLY_RESOURCE;

  /* TO-DO For upgrading V2 API don't remove commented parts */
  // const groupedResourceProviders = useAppSelector(bookingSelector.groupedServiceProvidersList);
  // const isGroupedResourceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  // const [resourceProviderCurrentPage, setResourceProviderCurrentPage] = useState<number>(1);
  // const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
  //   if (resourceItem) {
  //     onChange(resourceItem);
  //   } else {
  //     onChange({ ...defaultResource });
  //   }
  // };

  // const adaptedGroupedOptions = () =>
  //   groupedResourceProviders.providers.flatMap((provider) =>
  //     provider?.items.map((option) => ({ ...option, type: provider.groupTitle }))
  //   );

  // const onResourceProviderScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
  //   const eventTarget = event.target as HTMLDivElement;

  //   if (eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight) {
  //     if (groupedResourceProviders.pageSize * resourceProviderCurrentPage <= groupedResourceProviders.totalItems) {
  //       setResourceProviderCurrentPage(resourceProviderCurrentPage + 1);
  //       dispatch(bookingMiddleware.getNewGroupedServiceProviders({ page: resourceProviderCurrentPage }));
  //     }
  //   }
  // };

  return (
    <ApplyScheduleFormRow title={resourceLabel}>
      <BaseDropdownWithLoading
        isLoading={isServiceProvidersLoading}
        id={ApplyScheduleFields.RESOURCE}
        options={optionsGroup}
        onChange={(_, value) => {
          if (value && typeof value === 'object' && 'item' in value) {
            onChange(value.item.id);
          }
        }}
        inputValue={optionsGroup.find((item) => item.item.id === resourceId)?.item.title ?? ''}
        isOptionEqualToValue={(option, value) => option.item.id === value.item.id}
        getOptionLabel={(option) => (typeof option === 'object' ? option.item.title : option)}
        groupBy={(option) => option.firstLetter}
        onBlur={onBlur}
        clearIcon={<CloseIcon onClick={() => onChange('')} fontSize="small" />}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        renderInputProps={{
          label: resourceLabel,
          helperText: error?.message ?? '',
          error: !!error?.message,
          ...fieldProps
        }}
        data-cy={resourceCyId}
      />
      {/* <BaseDropdownWithLoading
        isLoading={isGroupedResourceProvidersLoading}
        PopperComponent={GroupedServiceProvidersPopper}
        inputValue={resource.title}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        onChange={(_event, resourceProvider) => {
          if (resourceProvider) {
            onSelectResourceUpdate(resourceProvider as IServiceProvider);
          }
        }}
        ListboxProps={{
          onScroll: (event) => onResourceProviderScroll(event)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={adaptedGroupedOptions()}
        getOptionLabel={(itemResource) => (typeof itemResource === 'object' ? itemResource.title : itemResource)}
        groupBy={(resourceOption) => resourceOption.type}
        clearIcon={<CloseIcon onClick={() => onSelectResourceUpdate(null)} fontSize="small" />}
        renderInputProps={{ label }}
      /> */}
    </ApplyScheduleFormRow>
  );
};

export default ResourceField;
