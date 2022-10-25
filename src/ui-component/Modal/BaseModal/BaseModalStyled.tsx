import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

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
