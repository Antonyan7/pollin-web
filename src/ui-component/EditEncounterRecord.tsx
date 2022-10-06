import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Typography } from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';
import SubCardStyled from 'ui-component/cards/SubCardStyled';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const EditEncounterRecord = () => {
  const [editorValue, setEditorValue] = useState<string>('Some text');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;

  return (
    <SubCardStyled
      content
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
                Edit Encounter Note
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
        <Grid item container xs={6} spacing={2} direction="column">
          <Grid item>
            <Typography variant="subtitle2">Encounter Type</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Consultation - In Clinic</Typography>
          </Grid>
        </Grid>
        <NoteEditor editorValue={editorValue} setEditorValue={setEditorValue} mode={SimpleEditorMode.Edit} />
      </Grid>
    </SubCardStyled>
  );
};

export default EditEncounterRecord;
