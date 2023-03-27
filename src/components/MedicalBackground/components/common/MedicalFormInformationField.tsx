import React, { FC, PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { ConsultationFormSubTitle } from '.';

interface MedicalFormInformationFieldProps extends PropsWithChildren {
  title: string;
}

const MedicalFormInformationField: FC<MedicalFormInformationFieldProps> = ({ title, children }) => (
  <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
    <Grid item container direction="row" alignItems="center" xs={12}>
      <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
        <ConsultationFormSubTitle>{title}</ConsultationFormSubTitle>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" xs={7}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default MedicalFormInformationField;
