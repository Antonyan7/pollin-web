import { Chip } from '@mui/material';
import { styled } from '@mui/system';

const ProgressBarIndicator = styled(Chip)(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.palette.secondary.dark : theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  '& > span': {
    display: 'flex',
    justifyContent: 'center'
  },
  maxWidth: 25,
  maxHeight: 25
}));

export default ProgressBarIndicator;
