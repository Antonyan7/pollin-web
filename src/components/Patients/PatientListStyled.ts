import { Box, styled } from '@mui/material';
import { BoxProps } from '@mui/system';

export const PatientListStyled = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: '35px',
  borderRadius: '7px',
  border: '1px solid #dce1e4',
  padding: '0 2rem',
  paddingTop: '2rem',
  backgroundColor: theme.palette.background.paper
}));
