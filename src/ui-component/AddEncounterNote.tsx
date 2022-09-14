// TODO we need to change the place of the component when Encounters page will be done.
import React, { SetStateAction, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, Grid, InputLabel, Select, Typography } from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';

import SubCard from './cards/SubCard';

const NoteEditor = dynamic<{ editorValue: string; setEditorValue: React.Dispatch<SetStateAction<string>> }>(
  () => import('@ui-component/SimpleTextEditor'),
  { ssr: false }
);

const AddEncounterNote = () => {
  const [editorValue, setEditorValue] = useState<string>('Encounter Note');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;

  return (
    <SubCard
      title={
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid container item xs={6}>
            <Grid item xs={1}>
              <ArrowBackIosIcon />
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{ color: (theme) => theme.palette.common.black, marginRight: '20px' }}
                fontSize="21px"
                fontWeight="400"
              >
                Create Encounter
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={2} justifyContent="flex-end">
            <Typography variant="h4">{encounterNoteEditedTime}</Typography>
          </Grid>
        </Grid>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="encounter-label">Encounter Type</InputLabel>
            <Select labelId="encounter-label" id="encounter-type" label="Encounter Type" />
          </FormControl>
        </Grid>
        <NoteEditor editorValue={editorValue} setEditorValue={setEditorValue} />
      </Grid>
    </SubCard>
  );
};

export default AddEncounterNote;
