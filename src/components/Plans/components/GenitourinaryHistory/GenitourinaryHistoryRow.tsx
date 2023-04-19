import React from 'react';
import { ConsultationTitleWithIcon } from '@components/common';
import ConsultationFormRadio from '@components/Plans/components/ConslutationFormRadio/ConsultationFormRadio';
import { GenitourinaryHistoryContentProps } from '@components/Plans/types';
import { Grid } from '@mui/material';

const GenitourinaryHistoryRow = ({ description, fieldName }: GenitourinaryHistoryContentProps) => (
  <Grid item container direction="row" xs={12} alignItems="center">
    <Grid item container xs={4} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
      <ConsultationTitleWithIcon description={description} />
    </Grid>
    <Grid item xs={8}>
      <ConsultationFormRadio fieldName={fieldName} />
    </Grid>
  </Grid>
);

export default GenitourinaryHistoryRow;
