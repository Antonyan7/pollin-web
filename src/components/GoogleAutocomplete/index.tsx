import React, { useEffect, useState } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { borderRadius, borders } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

type GoogleAutocompleteField =
  | ControllerRenderProps<FieldValues, 'primaryAddress.streetAddress'>
  | ControllerRenderProps<FieldValues, 'mailingAddress.streetAddress'>;
interface GoogleAutocompleteProps {
  field: GoogleAutocompleteField;
  fieldState: ControllerFieldState;
}

const GoogleAutocomplete = ({ field, fieldState }: GoogleAutocompleteProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const googleLabel = t(Translation.GOOGLE_AUTOCOMPLETE_LABEL_TITLE);
  const { onChange, onBlur, ...fieldProps } = field;
  const errorHelperText = generateErrorMessage(googleLabel);
  const [address, setAddress] = useState<string>(fieldProps.value);

  const onPlaceChange = (placeAddress: string) => {
    setAddress(placeAddress);
    onChange(placeAddress);
  };

  useEffect(
    () => {
      if (fieldProps.value) {
        onPlaceChange(fieldProps.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fieldProps.value]
  );

  return (
    <PlacesAutocomplete value={address} onChange={(currentAddress) => onPlaceChange(currentAddress)}>
      {({ getInputProps, suggestions, loading }) => (
        <Grid>
          <BaseDropdownWithLoading
            id="google-autocomplete-dropdown"
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
            inputValue={address}
            onInputChange={(_event, value) => {
              if (value) {
                onPlaceChange(address);
              }
            }}
            sx={{
              '& .MuiAutocomplete-popupIndicator': {
                display: 'none'
              },
              '& .MuiAutocomplete-clearIndicator': {
                display: 'none'
              },
              '&:hover': {
                '& .MuiAutocomplete-clearIndicator': {
                  display: 'none'
                },
                '&:hover': {
                  '& .MuiAutocomplete-clearIndicator': {
                    display: 'none'
                  }
                }
              }
            }}
            onBlur={onBlur}
            onChange={(_, value) =>
              value && typeof value === 'object' && 'description' in value && onChange(value.description)
            }
            options={suggestions.length ? suggestions : []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => (typeof option === 'object' ? option.description ?? '' : option)}
            isLoading={loading}
            renderInputProps={{
              label: googleLabel,
              helperText: fieldState?.error && errorHelperText,
              error: Boolean(fieldState?.error),
              ...fieldProps,
              ...getInputProps()
            }}
          />
        </Grid>
      )}
    </PlacesAutocomplete>
  );
};

export default GoogleAutocomplete;
