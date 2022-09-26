import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, FormControl, TextField, TextFieldProps } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { IServiceProvider } from 'types/reduxTypes/booking';

interface Props {
  setResource: React.Dispatch<React.SetStateAction<IServiceProvider>>;
  label: string;
  resource: IServiceProvider;
}

const ResourceField = ({ setResource, label, resource }: Props) => {
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);

  const onSelectResourceUpdate = (resourceItem: IServiceProvider | null) => {
    if (resourceItem) {
      setResource(resourceItem);
    }
  };

  return (
    <FormControl fullWidth>
      <Autocomplete
        inputValue={resource.title}
        popupIcon={<KeyboardArrowDownIcon />}
        onChange={(e, value) => {
          onSelectResourceUpdate(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={serviceProviders.providers}
        getOptionLabel={(itemResource) => itemResource.title}
        renderInput={(params: TextFieldProps) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
};

export default ResourceField;
