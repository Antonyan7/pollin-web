import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { borderRadius, borders,paddings } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const GoogleAutocomplete = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const googleLabel = t(Translation.GOOGLE_AUTOCOMPLETE_LABEL_TITLE);
  const handleSelect = (addressName: string) => {
    setAddress(addressName);
    setOpenAutocomplete(false);
  };
  const onPlaceChange = (placeAddress: string) => {
    setAddress(placeAddress);

    if (placeAddress.length > 0) {
      setOpenAutocomplete(true);
    } else {
      setOpenAutocomplete(false);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(currentAddress) => onPlaceChange(currentAddress)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, loading }) => (
          <Grid>
            <BaseDropdownWithLoading
              id="google-autocomplete-dropdown"
              open={openAutocomplete}
              ListboxProps={{
                style: {
                  maxHeight: 260,
                  borderRadius: `${borderRadius.radius8}`,
                  border: `${borders.solid2px} ${theme.palette.primary.main}`,
                  position: 'absolute',
                  top: '10px',
                  width: '100%',
                  backgroundColor: theme.palette.common.white
                }
              }}
              sx={{
                py: paddings.topBottom16,
                '& .MuiAutocomplete-popupIndicator': {
                  display: 'none'
                },
                '& .MuiAutocomplete-clearIndicator': {
                  display: 'none'
                },
                '&:hover': {
                  '& .MuiAutocomplete-clearIndicator': {
                    display: 'none'
                  }
                }
              }}
              onClose={() => setOpenAutocomplete(false)}
              options={suggestions.length ? suggestions : []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (typeof option === 'object' ? option.description ?? '' : option)}
              isLoading={loading}
              renderInputProps={{
                label: googleLabel,
                ...getInputProps()
              }}
            />
          </Grid>
        )}
    </PlacesAutocomplete>
  );
};

export default GoogleAutocomplete;
