import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BaseModalStyled = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1)
  },
  '.DialogBox': {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    width: '500px',
    height: '200px'
  }
}));
