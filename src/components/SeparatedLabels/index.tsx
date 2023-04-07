import React from 'react';
import { Circle } from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

const SeparatedLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.secondary[800],
  lineHeight: '140%'
}));

const SeparatedLabels = ({ labels }: { labels: string[] }) => (
  <Stack direction="row" display="flex" alignItems="center" spacing={1}>
    <SeparatedLabel>{labels[0]}</SeparatedLabel>
    <Circle sx={{ fontSize: '0.5rem', color: (theme) => theme.palette.common.black }} />
    <SeparatedLabel>{labels[1]}</SeparatedLabel>
  </Stack>
);

export default SeparatedLabels;
