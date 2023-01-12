import { Dialog, styled } from '@mui/material';

export const BaseModalStyled = styled(Dialog)(({ theme }) => ({
  '.Dialog-box': {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    width: '500px',
    height: '200px'
  }
}));
