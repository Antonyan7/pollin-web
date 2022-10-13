import { Box, styled } from '@mui/material';
import { BoxProps } from '@mui/system';
import { borderRadius, borders, margins } from 'themes/themeConstants';

export const PatientListStyled = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: margins.top36,
  borderRadius: borderRadius.radius8,
  border: `${borders.solid1px} #dce1e4`,
  padding: '0 2rem',
  paddingTop: '2rem',
  backgroundColor: theme.palette.background.paper
}));
