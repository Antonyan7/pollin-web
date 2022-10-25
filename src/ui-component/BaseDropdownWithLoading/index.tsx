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

import BottombarLoading from './BottombarLoading';
import Listbox, { BaseDropdownWithLoadingContext } from './Listbox';

interface BaseDropdownWithLoadingProps
  extends Omit<
    AutocompleteProps<any | unknown, boolean | undefined, boolean | undefined, boolean | undefined>,
    'renderInput'
  > {
  renderInputProps?: TextFieldProps | InputProps;
  isLoading: boolean;
}

interface AutocompleteTextFieldProps {
  isLoading: boolean;
  renderInputProps?: TextFieldProps | InputProps;
  params: any;
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

const AutocompleteTextField = ({ params, isLoading, renderInputProps }: AutocompleteTextFieldProps) => (
  <TextField
    {...params}
    {...renderInputProps}
    InputProps={{
      ...params.InputProps,
      endAdornment: isLoading ? <EndAdornmentLoading /> : params?.InputProps?.endAdornment
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
        renderInput={(params: AutocompleteRenderInputParams) => (
          <AutocompleteTextField
            params={params}
            isLoading={isFirstLoading && isLoading}
            renderInputProps={renderInputProps}
          />
        )}
      />
    </BaseDropdownWithLoadingContext.Provider>
  );
};

interface BaseSelectWithLoadingProps extends SelectProps<any> {
  isLoading?: boolean;
}

export const BaseSelectWithLoading: React.FC<BaseSelectWithLoadingProps> = ({ isLoading, ...selectProps }) => (
  <FormControl fullWidth>
    <InputLabel id={selectProps.labelId}>{selectProps.label}</InputLabel>
    <Select {...selectProps}>
      {selectProps.children}
      {isLoading && <BottombarLoading />}
    </Select>
  </FormControl>
);

export default BaseDropdownWithLoading;
