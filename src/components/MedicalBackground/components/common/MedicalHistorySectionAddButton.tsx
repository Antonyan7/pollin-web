import React from 'react';
import { useWatch } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import { Button, Grid, useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

import { ConsultationFormSubTitle } from '.';

interface MedicalHistorySectionAddButtonProps {
  onClick: () => void;
  subTitle: string;
  lastFieldIndex: number;
  fieldName: string;
}

const MedicalHistorySectionAddButton = ({
  onClick,
  subTitle,
  lastFieldIndex,
  fieldName
}: MedicalHistorySectionAddButtonProps) => {
  const theme = useTheme();

  const lastSectionItem = useWatch({ name: `${fieldName}.${lastFieldIndex}` }) ?? {};
  const isAllFieldsFilled = Object.values(lastSectionItem).every((value) => {
    if (typeof value === 'object') {
      return Object.values(value as Object).every(Boolean);
    }

    return !!value;
  });

  return (
    <Grid item container alignItems="center" justifyContent="center">
      <Button onClick={onClick} disabled={!isAllFieldsFilled}>
        <Add sx={{ color: theme.palette.primary.main }} />
        <ConsultationFormSubTitle
          sx={{
            color: theme.palette.primary.main,
            marginLeft: margins.left8
          }}
        >
          {subTitle}
        </ConsultationFormSubTitle>
      </Button>
    </Grid>
  );
};

export default MedicalHistorySectionAddButton;
