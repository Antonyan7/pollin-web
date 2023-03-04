import { Grid, styled } from '@mui/material';
import { GridProps } from '@mui/system';

const CardItemWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  background: theme.palette.secondary[200],
  borderWidth: '0px 1px',
  borderStyle: 'solid',
  borderColor: theme.palette.primary.light,
  height: 30
}));

export default CardItemWrapper;
