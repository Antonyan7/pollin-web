import React from 'react';
import { Divider, Grid, RadioGroup, styled, Typography } from '@mui/material';
import { borders, margins } from 'themes/themeConstants';

import MedicalBackgroundNoteIcon from '@assets/icons/MedicalBackgroundNote';

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

export const ConsultationTitleWithIcon = ({ description, onClick }: { description: string; onClick?: () => void }) => (
  <Grid item container direction="row" alignItems="center" xs={12}>
    <Grid item container direction="row" alignItems="center" gap={2} xs={10}>
      <ConsultationFormSubTitle>{description}</ConsultationFormSubTitle>
      <MedicalBackgroundNoteIcon
        onClick={onClick}
        sx={{
          '&:hover': {
            cursor: onClick ? 'pointer' : 'initial'
          }
        }}
      />
    </Grid>
    <Grid item xs={2}>
      <Typography>:</Typography>
    </Grid>
  </Grid>
);

export const RenderSingleValueAndNote = ({ value, note }: { value?: string | number; note?: string }) => (
  <Grid item container xs={7} direction="column" justifyContent="space-between">
    <Grid>{value}</Grid>
    {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
    <Grid>{note || ''}</Grid>
  </Grid>
);

export const RenderMappedNote = ({ note }: { note?: string }) => (note ? <Grid mt={margins.top16}>{note}</Grid> : null);
