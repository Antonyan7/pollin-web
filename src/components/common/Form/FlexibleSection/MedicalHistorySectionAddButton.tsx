import React from 'react';
import { useWatch } from 'react-hook-form';
import { ConsultationFormSubTitle } from '@components/common';
import { Add } from '@mui/icons-material';
import { Button, Grid, useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

interface FlexibleSectionAddButtonProps {
  onClick: () => void;
  subTitle: string;
  lastFieldIndex: number;
  fieldName: string;
}

const FlexibleSectionAddButton = ({ onClick, subTitle, lastFieldIndex, fieldName }: FlexibleSectionAddButtonProps) => {
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
      <Button
        onClick={onClick}
        disabled={!isAllFieldsFilled}
        sx={{
          [`.Mui-disabled`]: {
            opacity: 0.38
          }
        }}
      >
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

export default FlexibleSectionAddButton;
