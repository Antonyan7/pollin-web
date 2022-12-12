/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  TextField,
  TextFieldProps
} from '@mui/material';

import BottomBarLoading from './BottomBarLoading';
import Listbox, { BaseDropdownWithLoadingContext } from './Listbox';

interface BaseDropdownWithLoadingProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  renderInputProps?: TextFieldProps;
  isLoading: boolean;
  dataCy?: string;
}

const EndAdornmentLoading = () => (
  <CircularProgress
    color="primary"
    size={16}
    sx={{
      position: 'relative',
      left: '20px'
    }}
  />
);

const BaseDropdownWithLoading = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  isLoading,
  renderInputProps,
  dataCy,
  ...otherProps
}: BaseDropdownWithLoadingProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const isFirstLoading = useRef(true);

  if (isFirstLoading.current && isLoading) {
    isFirstLoading.current = false;
  }

  return (
    <BaseDropdownWithLoadingContext.Provider value={isLoading}>
      <Autocomplete
        {...otherProps}
        loading={isLoading}
        ListboxProps={{
          ...otherProps.ListboxProps,
          style: {
            ...otherProps?.ListboxProps?.style,
            position: 'relative'
          },
          id: 'listBox'
        }}
        ListboxComponent={Listbox}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            data-cy={dataCy ?? ''}
            {...params}
            {...renderInputProps}
            InputProps={{
              ...params.InputProps,
              endAdornment: isFirstLoading && isLoading ? <EndAdornmentLoading /> : params?.InputProps?.endAdornment
            }}
          />
        )}
      />
    </BaseDropdownWithLoadingContext.Provider>
  );
};

interface BaseSelectWithLoadingProps extends SelectProps<string> {
  isLoading?: boolean;
}

export const BaseSelectWithLoading: React.FC<BaseSelectWithLoadingProps> = ({ isLoading, ...selectProps }) => (
  <FormControl fullWidth>
    <InputLabel id={selectProps.labelId}>{selectProps.label}</InputLabel>
    <Select {...selectProps}>
      {selectProps.children}
      {isLoading && <BottomBarLoading />}
    </Select>
  </FormControl>
);

export default BaseDropdownWithLoading;
