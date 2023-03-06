import React from 'react';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import FamilyMemberName from './fields/FamilyMemberName';
import InheritedDisease from './fields/InheritedDisease';

const FamilyHistoryContent = ({ titleIndex }: DiagramTitleProps) => (
  <Grid item container direction="row" justifyContent="space-between" spacing={2} p={paddings.all16}>
    <InheritedDisease titleIndex={titleIndex} />
    <FamilyMemberName titleIndex={titleIndex} />
  </Grid>
);

export default FamilyHistoryContent;
