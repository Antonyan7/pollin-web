import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, GridProps, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

interface FieldWrapperProps extends Partial<GridProps> {
  fieldName: string;
  children: ReactNode;
  componentIndex?: number;
  hasNote: boolean;
}

const FieldWrapper = ({ children, fieldName, componentIndex, hasNote, ...props }: FieldWrapperProps) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const isBackgroundColored = typeof componentIndex === 'undefined' || (componentIndex && componentIndex % 2);

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="flex-start"
      px={paddings.leftRight16}
      py={paddings.topBottom8}
      xs={12}
      sx={{
        backgroundColor: isBackgroundColored ? theme.palette.common.white : theme.palette.secondary[200]
      }}
      {...props}
    >
      <Grid item container justifyContent="space-between" direction="column" xs={4} gap={3}>
        <Typography
          sx={{
            fontWeight: 500,
            color: theme.palette.secondary[800],
            fontSize: theme.typography.pxToRem(15)
          }}
        >
          {fieldName}
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            color: theme.palette.secondary[800],
            display: hasNote ? 'block' : 'none'
          }}
        >
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ADDITIONAL_NOTES)}
        </Typography>
      </Grid>
      <Grid item container xs={0.5} direction="column" justifyContent="space-between">
        <Grid item xs={0.5}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
        <Grid item xs={0.5} sx={{ display: hasNote ? 'grid' : 'none' }}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};

export default FieldWrapper;
