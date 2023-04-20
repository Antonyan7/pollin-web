import React from 'react';
import { ConsultationFormSubTitle } from '@components/MedicalBackground/components/common';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

interface MedicalFormAddDiagramProps {
  onClick: () => void;
  subTitle: string;
  fields?: Record<'id', string>[];
}

const AddDiagram = ({ onClick, subTitle, fields = [] }: MedicalFormAddDiagramProps) => {
  const theme = useTheme();
  const isAddButtonDisabled = fields?.length > 9;

  return (
    <Grid item container alignItems="center" justifyContent="center">
      <Button onClick={onClick} disabled={isAddButtonDisabled}>
        <AddIcon sx={{ color: theme.palette.primary.main }} />
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

export default AddDiagram;
