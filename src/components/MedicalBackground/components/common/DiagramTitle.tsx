import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Grid } from '@mui/material';

import { ConsultationFormSubTitle } from '.';

interface DiagramTitleProps {
  label: string;
  titleIndex: number;
  onClick: (titleIndex: number) => void;
}

const DiagramTitle = ({ label, titleIndex, onClick }: DiagramTitleProps) => (
  <Grid item container justifyContent="space-between" alignItems="center">
    <ConsultationFormSubTitle>{`${label} ${titleIndex + 1}`}</ConsultationFormSubTitle>
    <DeleteOutlineIcon
      onClick={() => {
        onClick(titleIndex);
      }}
      sx={{
        color: (theme) => theme.palette.primary.main,
        '&:hover': {
          cursor: 'pointer'
        }
      }}
    />
  </Grid>
);

export default DiagramTitle;
