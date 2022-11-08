import React, { useRef } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  CircularProgress,
  FormControl,
  InputLabel,
  InputProps,
  Select,
  SelectProps,
  TextField,
  TextFieldProps
} from '@mui/material';

import BottomBarLoading from './BottomBarLoading';
import Listbox, { BaseDropdownWithLoadingContext } from './Listbox';

interface BaseDropdownWithLoadingProps
  extends Omit<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AutocompleteProps<any, boolean, boolean, boolean>,
    'renderInput'
  > {
  renderInputProps?: TextFieldProps | InputProps;
  isLoading: boolean;
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

const BaseDropdownWithLoading = ({ isLoading, renderInputProps, ...otherProps }: BaseDropdownWithLoadingProps) => {
  let { current: isFirstLoading } = useRef(true);

  if (isFirstLoading && isLoading) {
    isFirstLoading = false;
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
        renderInput={(params: AutocompleteRenderInputParams) => {
          const props = { ...params, ...renderInputProps } as AutocompleteRenderInputParams;

          return (
            <TextField
              {...props}
              InputProps={{
                ...params.InputProps,
                endAdornment: isFirstLoading && isLoading ? <EndAdornmentLoading /> : params?.InputProps?.endAdornment
              }}
            />
          );
        }}
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
