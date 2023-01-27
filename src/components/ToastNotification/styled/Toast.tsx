import { Snackbar, styled } from '@mui/material';

const Toast = styled(Snackbar)(({ theme }) => ({
  width: '30wv',
  '@media (min-width: 780px)': {
    width: '40wv'
  },
  '.alert-banner': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(14),
    '& .MuiAlert-icon': {
      fontSize: theme.typography.pxToRem(24)
    }
  }
}));

export default Toast;
