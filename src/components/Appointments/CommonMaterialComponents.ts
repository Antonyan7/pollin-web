import {
  Box,
  BoxProps,
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

const StyledSelectButton = styled(Select)<SelectProps>(({ theme }) => ({
  color: theme.palette.common.white,
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.dark[300]
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.dark[300]
  }
}));

const StyledInputLabel = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  color: theme.palette.common.black,
  '&.Mui-focused': {
    color: theme.palette.common.black
  }
}));

const InternalButton = styled(Button)<ButtonProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.dark[300]}`,
  borderRadius: '7px',
  color: theme.palette.common.black,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.dark[400],
  '&:hover': {
    backgroundColor: theme.palette.dark[200],
    border: `1px solid ${theme.palette.dark[300]}`
  }
}));

const StyledTextareaAutosize = styled(TextareaAutosize)<TextareaAutosizeProps>(({ theme }) => ({
  maxWidth: '100%',
  minWidth: '100%',
  border: `1px solid ${theme.palette.dark[300]}`,
  borderRadius: '7px',
  backgroundColor: theme.palette.dark[400],
  maxHeight: '150px',
  minHeight: '50px',
  width: '100%',
  height: '200px'
}));

const StyledButtonNewCalendar = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.common.black,
  border: `1px solid ${theme.palette.dark[300]}`,
  borderRadius: '7px',
  padding: '15px 20px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.dark[200],
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.dark[300]}`
  }
}));

const StyledTodayButton = styled(Button)<ButtonProps>(({ theme }) => ({
  height: '100%',
  width: '70px',
  border: `1px solid ${theme.palette.dark[300]}`,
  borderRadius: '7px',
  color: theme.palette.common.black,
  '&:hover': {
    backgroundColor: theme.palette.dark[200],
    border: `1px solid ${theme.palette.dark[300]}`
  }
}));

const StyledBox = styled(Box)<BoxProps>(() => ({
  textAlign: 'left',
  marginBottom: '8px'
}));

export {
  InternalButton,
  StyledBox,
  StyledButtonNewCalendar,
  StyledInputLabel,
  StyledSelectButton,
  StyledTextareaAutosize,
  StyledTodayButton
};
