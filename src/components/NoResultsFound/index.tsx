import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { NoResultsFoundProps } from './types';

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ label = '', ...props }) => {
  const [t] = useTranslation();
  const notFoundLabel = label ?? t(Translation.COMMON_TABLE_NO_RESULTS_FOUND);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        justifyContent: 'center'
      }}
      {...props}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          py: paddings.topBottom32,
          color: (theme) => theme.palette.primary.dark
        }}
      >
        {notFoundLabel}
      </Typography>
    </Grid>
  );
};

export default NoResultsFound;
