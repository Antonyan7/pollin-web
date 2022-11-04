import { SxProps, TextFieldProps } from '@mui/material';

export interface TextFieldWithLabelProps {
  label: string;
  placeholder: string;
  containerStyles?: SxProps;
  labelStyles?: SxProps;
  textFieldProps?: TextFieldProps;
}
