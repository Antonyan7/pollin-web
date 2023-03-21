import React from 'react';
import { CircularProgress, CircularProgressProps, Grid, SxProps } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { margins, paddings } from 'themes/themeConstants';

interface CircularLoadingProps {
  loadingProps?: CircularProgressProps;
  sx?: SxProps;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ loadingProps, sx }) => (
  <Grid
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      width: '100%',
      height: '100%',
      margin: margins.auto,
      marginTop: margins.top16,
      py: paddings.topBottom16,
      ...sx
    }}
  >
    <CircularProgress size={40} {...loadingProps} data-cy={CypressIds.COMMON_LOADING_INDICATOR} />
  </Grid>
);

export default CircularLoading;
