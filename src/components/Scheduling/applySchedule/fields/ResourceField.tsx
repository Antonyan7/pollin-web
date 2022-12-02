import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { defaultResource } from '../defaultValues';

interface Props {
  setResource: React.Dispatch<React.SetStateAction<IServiceProvider>>;
  label: string;
  resource: IServiceProvider;
}

const ResourceField = ({ setResource, label, resource }: Props) => {
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  const isServiceProvidersLoading = useAppSelector(bookingSelector.isServiceProvidersLoading);
  // const groupedResourceProviders = useAppSelector(bookingSelector.groupedServiceProvidersList);
  // const isGroupedResourceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  // const [resourceProviderCurrentPage, setResourceProviderCurrentPage] = useState<number>(1);
  const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
    if (resourceItem) {
      setResource(resourceItem);
    } else {
      setResource({ ...defaultResource });
    }
  };

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
    <FormControl fullWidth>
      <BaseDropdownWithLoading
        isLoading={isServiceProvidersLoading}
        inputValue={resource.title}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        onChange={(e, value) => {
          if (value && typeof value !== 'string' && 'id' in value) {
            onSelectResourceUpdate(value);
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={serviceProviders.providers}
        getOptionLabel={(itemResource) => (typeof itemResource === 'object' ? itemResource.title : itemResource)}
        clearIcon={<CloseIcon onClick={() => onSelectResourceUpdate(null)} fontSize="small" />}
        renderInputProps={{ label }}
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
    </FormControl>
  );
};

export default ResourceField;
