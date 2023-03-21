import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, useTheme } from '@mui/material';
import { margins } from 'themes/themeConstants';

import { ConsultationFormSubTitle } from '.';

interface MedicalFormAddDiagramProps {
  onClick: () => void;
  subTitle: string;
  fields?: Record<'id', string>[];
}

const MedicalFormAddDiagram = ({ onClick, subTitle, fields = [] }: MedicalFormAddDiagramProps) => {
  const theme = useTheme();
  const isAddButtonDisabled = fields?.length > 4;

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

export default MedicalFormAddDiagram;
