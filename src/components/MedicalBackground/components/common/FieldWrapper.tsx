import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

interface FieldWrapperProps {
  fieldName: string;
  children: ReactNode;
  componentIndex?: number;
}

const FieldWrapper = ({ children, fieldName, componentIndex }: FieldWrapperProps) => {
  const theme = useTheme();
  const [t] = useTranslation();

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
        backgroundColor:
          componentIndex && componentIndex % 2 ? theme.palette.common.white : theme.palette.secondary[200]
      }}
    >
      <Grid item container justifyContent="space-between" direction="column" xs={4} gap={3}>
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary[800],
            fontSize: theme.typography.pxToRem(15)
          }}
        >
          {fieldName}
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.common.black
          }}
        >
          {t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_ADDITIONAL_NOTES)}
        </Typography>
      </Grid>
      <Grid item container xs={0.5} direction="column" justifyContent="space-between">
        <Grid item xs={0.5}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
        <Grid item xs={0.5}>
          <Typography sx={{ color: theme.palette.secondary[800] }}>:</Typography>
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};

export default FieldWrapper;
