import {
  Button,
  ButtonProps,
  InputLabel,
  InputLabelProps,
  Select,
  SelectProps,
  styled,
  TextareaAutosize,
  TextareaAutosizeProps
} from '@mui/material';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const StyledSelectButton = styled(Select)<SelectProps>(() => ({
  color: cssVariables.paper,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: cssVariables.commonBorderColor
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: cssVariables.commonBorderColor
  }
}));

const StyledInputLabel = styled(InputLabel)<InputLabelProps>(() => ({
  color: cssVariables.paperDark,
  '&.Mui-focused': {
    color: cssVariables.paperDark
  }
}));

const StyledPatientButton = styled(Button)<ButtonProps>(() => ({
  border: `1px solid ${cssVariables.commonBorderColor}`,
  borderRadius: '7px',
  color: 'black',
  display: 'flex',
  justifyContent: 'flex-start',
  backgroundColor: cssVariables.commonButtonBackgroundColor,
  '&:hover': {
    backgroundColor: cssVariables.normalBackgroundDark,
    border: `1px solid ${cssVariables.commonBorderColor}`
  }
}));

const InternalButton = styled(Button)<ButtonProps>(() => ({
  border: `1px solid ${cssVariables.commonBorderColor}`,
  borderRadius: '7px',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: cssVariables.commonButtonBackgroundColor,
  '&:hover': {
    backgroundColor: cssVariables.normalBackgroundDark,
    border: `1px solid ${cssVariables.commonBorderColor}`
  }
}));

const StyledTextareaAutosize = styled(TextareaAutosize)<TextareaAutosizeProps>(() => ({
  maxWidth: '100%',
  minWidth: '100%',
  border: `1px solid ${cssVariables.commonBorderColor}`,
  borderRadius: '7px',
  backgroundColor: cssVariables.commonButtonBackgroundColor,
  maxHeight: '150px',
  minHeight: '50px',
  width: '100%',
  height: '200px'
}));

const StyledButtonNewCalendar = styled(Button)<ButtonProps>(() => ({
  color: cssVariables.paperDark,
  border: `1px solid ${cssVariables.commonBorderColor}`,
  borderRadius: '7px',
  padding: '15px 20px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: cssVariables.normalBackgroundDark,
    color: cssVariables.paper,
    border: `1px solid ${cssVariables.commonBorderColor}`
  }
}));

const StyledTodayButton = styled(Button)<ButtonProps>(() => ({
  height: '100%',
  width: '70px',
  border: `1px solid ${cssVariables.commonBorderColor}`,
  borderRadius: '7px',
  color: cssVariables.paperDark,
  '&:hover': {
    backgroundColor: cssVariables.normalBackgroundDark,
    border: `1px solid ${cssVariables.commonBorderColor}`
  }
}));

export {
  InternalButton,
  StyledButtonNewCalendar,
  StyledInputLabel,
  StyledPatientButton,
  StyledSelectButton,
  StyledTextareaAutosize,
  StyledTodayButton
};
