import React from 'react';
import { ConsultationFormSubTitle } from '@components/common';
import { PartnerFormHeaderProps } from '@components/Plans/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid, useTheme } from '@mui/material';

const PartnerFormHeader = ({ title }: PartnerFormHeaderProps) => {
  const theme = useTheme();

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <ConsultationFormSubTitle>{title}</ConsultationFormSubTitle>
      <DeleteOutlineIcon
        sx={{
          color: theme.palette.primary.main
        }}
      />
    </Grid>
  );
};

export default PartnerFormHeader;
