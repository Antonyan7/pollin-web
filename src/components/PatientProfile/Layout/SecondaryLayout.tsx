import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { SecondaryLayoutProps } from '../types';

const SecondaryLayout = ({ loading }: SecondaryLayoutProps) => {
  const [t] = useTranslation();

  return loading ? (
    <Box display="flex" justifyContent="center" py={paddings.topBottom24}>
      <CircularProgress />
    </Box>
  ) : (
    <Typography py={paddings.topBottom24} textAlign="center">
      {t(Translation.PAGE_PATIENT_WIDGET_DATA_IS_NOT_AVALIABLE)}
    </Typography>
  );
};

export default SecondaryLayout;
