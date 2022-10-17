import { Box, styled } from '@mui/material';
import { BoxProps } from '@mui/system';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';

export const PatientListStyled = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: margins.top20,
  borderRadius: borderRadius.radius8,
  border: `${borders.solid1px} ${theme.palette.dark[500]}`,
  padding: paddings.all24,
  backgroundColor: theme.palette.background.paper
}));
