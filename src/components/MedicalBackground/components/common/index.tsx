import React from 'react';
import { Divider, Grid, IconButton, RadioGroup, styled, Typography } from '@mui/material';
import { borders, margins } from 'themes/themeConstants';
import { v5 as uuidv5 } from 'uuid';

import MedicalBackgroundNoteIcon from '@assets/icons/MedicalBackgroundNote';
import { isDashValue } from '@utils/stringUtils';

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

export const ConsultationTitleWithIcon = ({
  description,
  onClick,
  isShown
}: {
  description: string;
  onClick?: () => void;
  isShown?: boolean;
}) => (
  <Grid item container direction="row" alignItems="center" xs={12}>
    <Grid item container direction="row" alignItems="center" gap={2} xs={10}>
      <ConsultationFormSubTitle>{description}</ConsultationFormSubTitle>
      <IconButton
        {...(isShown
          ? {
              sx: {
                '& svg': {
                  opacity: '40%'
                }
              }
            }
          : {
              onClick
            })}
        disableRipple
        disableTouchRipple
      >
        <MedicalBackgroundNoteIcon />
      </IconButton>
    </Grid>
    <Grid item xs={2}>
      <Typography>:</Typography>
    </Grid>
  </Grid>
);

export const RenderSingleValueAndNote = ({ value, note }: { value?: string | number; note?: string }) => (
  <Grid item container xs={7} direction="column" justifyContent="space-between">
    {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
    <Grid>{value || '-'}</Grid>
    {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
    <Grid>{note || ''}</Grid>
  </Grid>
);

export const RenderMappedNote = ({ note }: { note?: string }) => (note ? <Grid mt={margins.top16}>{note}</Grid> : null);

export const RenderFieldWithAdditionalValues = ({
  value,
  additionalValues,
  note
}: {
  value: string | number;
  additionalValues: string[];
  note?: string;
}) => (
  <Grid item container xs={7} direction="column" justifyContent="space-between">
    <Grid>{value || '-'}</Grid>
    {additionalValues.map((fieldValue, index: number) =>
      fieldValue && !isDashValue(fieldValue) ? (
        <Grid
          key={uuidv5(JSON.stringify(fieldValue).concat(index.toString()), uuidv5.URL)}
          mt={!index ? margins.top16 : margins.top4}
        >
          {' '}
          {fieldValue}
        </Grid>
      ) : null
    )}
    <Grid>{note ?? ''}</Grid>
  </Grid>
);
