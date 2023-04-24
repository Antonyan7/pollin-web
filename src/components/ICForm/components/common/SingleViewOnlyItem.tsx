import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { SingleViewOnlyItemProps } from '../types';

const SingleViewOnlyItem = ({ itemTitle, itemValue, index, note }: SingleViewOnlyItemProps) => {
  const isBackgroundColored = typeof index === 'undefined' || (index && index % 2);
  const theme = useTheme();
  const [t] = useTranslation();

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="flex-start"
      xs={12}
      py={paddings.topBottom8}
      sx={{
        backgroundColor: !isBackgroundColored ? theme.palette.common.white : theme.palette.secondary[200]
      }}
    >
      <Grid item container justifyContent="space-between" direction="column" xs={4} gap={1}>
        <Typography
          sx={{
            color: theme.palette.secondary[800],
            fontSize: theme.typography.pxToRem(15)
          }}
        >
          {itemTitle}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.secondary[800],
            fontSize: theme.typography.pxToRem(15),
            display: note ? 'block' : 'none'
          }}
        >
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ADDITIONAL_NOTES)}
        </Typography>
      </Grid>
      <Grid item container xs={0.5} direction="column" justifyContent="space-between">
        <Grid item xs={0.5}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
        <Grid item xs={0.5} sx={{ display: note ? 'block' : 'none' }}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={7} direction="column" justifyContent="space-between">
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        <Grid>{itemValue || '-'}</Grid>
        <Grid
          sx={{
            display: note ? 'block' : 'none',
            paddingTop: paddings.top8
          }}
        >
          {note}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleViewOnlyItem;
