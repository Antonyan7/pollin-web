import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { ConsultationTitleWithIcon } from '.';

interface MedicalComponentWithRadioViewProps {
  iconTitle: string;
  children: ReactNode;
}

const MedicalComponentWithRadioView = ({ iconTitle, children }: MedicalComponentWithRadioViewProps) => (
  <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
    <Grid item container direction="row" alignItems="center" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationTitleWithIcon description={iconTitle} />
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" xs={7}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default MedicalComponentWithRadioView;
