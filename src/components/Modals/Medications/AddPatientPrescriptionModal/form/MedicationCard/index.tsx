import React from 'react';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import Dosage from './fields/Dosage';
import DrugName from './fields/DrugName';
import EndDate from './fields/EndDate';
import Frequency from './fields/Frequency';
import MedicationQtyField from './fields/MedicationQty';
import OtherDoctorNotesField from './fields/OtherDoctorNotes';
import Refill from './fields/Refill';
import RefillNotesField from './fields/RefillNotes';
import Route from './fields/Route';
import StartDate from './fields/StartDate';
import Time from './fields/Time';

const MedicationCard = ({ index }: { index: number }) => (
  <Grid
    container
    spacing={1}
    justifyContent="center"
    alignItems="center"
    sx={{ background: (theme) => theme.palette.primary.light, p: paddings.all16 }}
  >
    <Grid item xs={12}>
      <DrugName index={index} />
    </Grid>
    <Grid item xs={6}>
      <Dosage index={index} />
    </Grid>
    <Grid item xs={6}>
      <Route index={index} />
    </Grid>
    <Grid item xs={12}>
      <Frequency index={index} />
    </Grid>
    <Grid item xs={12}>
      <Time index={index} />
    </Grid>
    <Grid item xs={6}>
      <StartDate titleIndex={index} />
    </Grid>
    <Grid item xs={6}>
      <EndDate titleIndex={index} />
    </Grid>
    <Grid item xs={6}>
      <MedicationQtyField index={index} />
    </Grid>
    <Grid item xs={6}>
      <Refill index={index} />
    </Grid>
    <Grid item xs={12}>
      <RefillNotesField index={index} />
    </Grid>
    <Grid item xs={12}>
      <OtherDoctorNotesField index={index} />
    </Grid>
  </Grid>
);

export default MedicationCard;
