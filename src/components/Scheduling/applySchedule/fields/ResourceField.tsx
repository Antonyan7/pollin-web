import React from 'react';
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
  const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
    if (resourceItem) {
      setResource(resourceItem);
    } else {
      setResource({ ...defaultResource });
    }
  };

  return (
    <FormControl fullWidth>
      <BaseDropdownWithLoading
        isLoading={isServiceProvidersLoading}
        inputValue={resource.title}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        onChange={(e, value) => {
          onSelectResourceUpdate(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={serviceProviders.providers}
        getOptionLabel={(itemResource) => itemResource.title}
        renderInputProps={{ label }}
      />
    </FormControl>
  );
};

export default ResourceField;
