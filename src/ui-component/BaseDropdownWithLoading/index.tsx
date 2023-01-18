/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  CircularProgress,
  FormControl,
  InputAdornment,
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
  <InputAdornment position="end" sx={{ right: '12px', pointerEvents: 'none', position: 'absolute' }}>
    <CircularProgress color="primary" size={20} />
  </InputAdornment>
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
  const isFirstLoading = useRef<boolean | null>(null);

  useEffect(() => {
    if (isFirstLoading.current === null && isLoading) {
      isFirstLoading.current = true;
    } else if (isFirstLoading.current === true && !isLoading) {
      isFirstLoading.current = false;
    }
  }, [isLoading]);

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
              endAdornment:
                isFirstLoading.current && isLoading ? <EndAdornmentLoading /> : params?.InputProps?.endAdornment
            }}
          />
        )}
      />
    </BaseDropdownWithLoadingContext.Provider>
  );
};

const LoadingIconComponent = () => (
  <InputAdornment position="end" sx={{ right: '12px', pointerEvents: 'none', position: 'absolute' }}>
    <CircularProgress color="primary" size={20} />
  </InputAdornment>
);

interface BaseSelectWithLoadingProps<T> extends SelectProps<T> {
  isLoading?: boolean;
}

export const BaseSelectWithLoading = <T,>({ isLoading, ...selectProps }: BaseSelectWithLoadingProps<T>) => {
  const isFirstLoading = useRef<boolean | null>(null);

  useEffect(() => {
    if (isFirstLoading.current === null && isLoading) {
      isFirstLoading.current = true;
    } else if (isFirstLoading.current === true && !isLoading) {
      isFirstLoading.current = false;
    }
  }, [isLoading]);

  return (
    <FormControl fullWidth>
      <InputLabel id={selectProps.labelId}>{selectProps.label}</InputLabel>
      <Select
        {...selectProps}
        IconComponent={isFirstLoading.current && isLoading ? LoadingIconComponent : selectProps.IconComponent}
      >
        {selectProps.children}
        {!isFirstLoading.current && isLoading && <BottomBarLoading />}
      </Select>
    </FormControl>
  );
};

export default BaseDropdownWithLoading;
