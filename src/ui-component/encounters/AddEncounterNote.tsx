import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const AddEncounterNote = () => {
  const [editorValue, setEditorValue] = useState<string>('Encounter Note');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const [t] = useTranslation();

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
                {t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER)}
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
        <NoteEditor editorValue={editorValue} setEditorValue={setEditorValue} mode={SimpleEditorMode.Add} />
      </Grid>
    </SubCardStyled>
  );
};

export default AddEncounterNote;
