import React from 'react';
import { RenderMappedNote } from '@components/MedicalBackground/components/common';
import { MedicalFormTitleNo } from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { margins } from 'themes/themeConstants';

export const NoTitleView = ({ note }: { note?: string }) => (
  <Grid>
    <MedicalFormTitleNo />
    <Grid item container direction="column" marginTop={margins.top16}>
      <RenderMappedNote note={note} />
    </Grid>
  </Grid>
);
