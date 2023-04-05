import { Divider, RadioGroup, styled, Typography } from '@mui/material';
import { borders } from 'themes/themeConstants';

export const ConsultationFormSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary[800],
  fontSize: theme.typography.pxToRem(16)
}));

export const ConsultationFormTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary[800],
  fontSize: theme.typography.pxToRem(21)
}));

export const ConsultationDivider = styled(Divider)(({ theme }) => ({
  color: theme.palette.primary.light,
  border: borders.solid1px
}));

export const ConsultationFormRadioGroup = styled(RadioGroup)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 3
}));
