import React, { PropsWithChildren, ReactNode } from 'react';
import { Grid } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';

import MedicalFormRadio from './MedicalFormRadio';
import { ConsultationTitleWithIcon } from '.';

interface MedicalComponentWithRadioProps extends PropsWithChildren {
  iconTitle: string;
  fieldName: string;
  children?: ReactNode;
}

const MedicalComponentWithRadio = ({ iconTitle, fieldName, children }: MedicalComponentWithRadioProps) => (
  <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
    <Grid
      item
      container
      direction="row"
      xs={5}
      alignItems="flex-start"
      flexWrap="nowrap"
      gap={1}
      sx={{
        marginTop: margins.top10
      }}
    >
      <ConsultationTitleWithIcon description={iconTitle} />
    </Grid>
    <Grid item container direction="column" xs={7} gap={2}>
      <Grid>
        <MedicalFormRadio fieldName={fieldName} />
      </Grid>
      {children}
    </Grid>
  </Grid>
);

export default MedicalComponentWithRadio;
