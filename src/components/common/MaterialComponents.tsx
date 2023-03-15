import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  InputLabel,
  InputLabelProps,
  Popper,
  Select,
  SelectProps,
  styled,
  TextareaAutosize,
  TextareaAutosizeProps
} from '@mui/material';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

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
  border: `${borders.solid1px} ${theme.palette.dark[300]}`,
  borderRadius: borderRadius.radius8,
  color: theme.palette.common.black,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.dark[400],
  '&:hover': {
    backgroundColor: theme.palette.dark[200],
    border: `${borders.solid1px} ${theme.palette.dark[300]}`
  }
}));

const StyledTextareaAutosize = styled(TextareaAutosize)<TextareaAutosizeProps>(({ theme }) => ({
  maxWidth: '100%',
  minWidth: '100%',
  border: `${borders.solid1px} ${theme.palette.dark[300]}`,
  borderRadius: borderRadius.radius8,
  backgroundColor: theme.palette.dark[400],
  maxHeight: '150px',
  minHeight: '50px',
  width: '100%',
  height: '200px',
  padding: `${paddings.topBottom8} ${paddings.leftRight16}`
}));

const StyledButtonNew = styled(Button)<ButtonProps>(() => ({
  '& > span > svg': {
    width: 24,
    height: 24
  },
  borderRadius: borderRadius.radius8,
  padding: `${paddings.topBottom16} ${paddings.leftRight20}`,
  display: 'flex',
  height: '52px',
  alignItems: 'center'
}));

const StyledButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: borderRadius.radius8,
  height: '45px'
}));

const StyledAddButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: borderRadius.radius4,
  width: '60px',
  height: '45px'
}));

const StyledBox = styled(Box)<BoxProps>(() => ({
  textAlign: 'left',
  marginBottom: margins.bottom8
}));

const ScheduleBoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: borderRadius.radius8,
  padding: paddings.all24,
  backgroundColor: theme.palette.background.paper
}));

const GroupedServiceProvidersPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-groupLabel': {
    fontWeight: 500,
    color: theme.palette.common.black
  }
}));

export {
  GroupedServiceProvidersPopper,
  InternalButton,
  ScheduleBoxWrapper,
  StyledAddButton,
  StyledBox,
  StyledButton,
  StyledButtonNew,
  StyledInputLabel,
  StyledSelectButton,
  StyledTextareaAutosize
};
