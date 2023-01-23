import React from 'react';
import { ConsultationTitleWithIconProps } from '@components/Plans/types';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Divider, RadioGroup, styled, Typography } from '@mui/material';
import { borders } from 'themes/themeConstants';

export const ConsultationFormSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 500
}));

export const ConsultationFormTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: theme.typography.pxToRem(21),
  fontWeight: 500
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

export const ConsultationTitleWithIcon = ({ description }: ConsultationTitleWithIconProps) => (
  <>
    <ConsultationFormSubTitle>{description}</ConsultationFormSubTitle>
    <TextSnippetIcon
      sx={{
        color: (theme) => theme.palette.primary.main
      }}
    />
  </>
);
