import React from 'react';
import DateOfSurgery from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/PastSurgeries/Content/fields/DateOfSurgery';
import SurgeryType from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/PastSurgeries/Content/fields/SurgeryType';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

const PastSurgeriesContent = ({ titleIndex }: DiagramTitleProps) => (
  <Grid item container direction="row" justifyContent="space-between" spacing={2} p={paddings.all16}>
    <SurgeryType titleIndex={titleIndex} />
    <DateOfSurgery titleIndex={titleIndex} />
  </Grid>
);

export default PastSurgeriesContent;
