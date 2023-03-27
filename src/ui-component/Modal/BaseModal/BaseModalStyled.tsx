import { Dialog, dialogClasses, paperClasses, styled } from '@mui/material';

export const BaseModalStyled = styled(Dialog)(({ theme }) => ({
  '.Dialog-box': {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    width: '500px',
    height: '200px'
  },
  [`.${paperClasses.root}`]: {
    maxHeight: '70%'
  },
  [`.${dialogClasses.container}`]: {
    marginTop: 40
  }
}));
