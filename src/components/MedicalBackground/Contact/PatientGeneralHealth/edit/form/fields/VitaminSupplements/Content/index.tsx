import React from 'react';
import DosageAndFrequency from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/VitaminSupplements/Content/fields/DosageAndFrequency';
import VitaminName from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/VitaminSupplements/Content/fields/VitaminName';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const VitaminSupplementsContent = ({ titleIndex }: DiagramTitleProps) => (
  <Grid item container direction="row" justifyContent="space-between" spacing={2} p={paddings.all16}>
    <VitaminName titleIndex={titleIndex} />
    <DosageAndFrequency titleIndex={titleIndex} />
  </Grid>
);

export default VitaminSupplementsContent;
