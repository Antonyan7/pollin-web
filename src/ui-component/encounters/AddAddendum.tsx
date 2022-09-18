import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import SubCard from '../cards/SubCard';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const AddAddendum = () => {
  const [editorValue, setEditorValue] = useState<string>('Encounter Note');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const [t] = useTranslation();

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
                {t(Translation.PAGE_ENCOUNTERS_ADD_ADDENDUM)}
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
        <Grid item container xs={12} spacing={2} direction="column">
          <Grid item>
            <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</Typography>
          </Grid>
          <Grid item>
            {/* //TODO this is just an example, so no need to put here any translation */}
            <Typography variant="subtitle1">Consultation - In Clinic</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}</Typography>
          </Grid>
          <Grid item>
            {/* //TODO this is just an example, so no need to put here any translation */}
            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum maiores inventore quibusdam
              magnam illum fuga similique voluptate officiis ullam error quam nemo culpa ducimus natus, exercitationem
              laudantium dicta. Dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem laborum
              architecto dolorum? Ratione, in modi esse culpa placeat enim necessitatibus voluptatem illo, quam iusto
              cum, ducimus quo! Mollitia, architecto hic.
            </Typography>
          </Grid>
        </Grid>
        <NoteEditor editorValue={editorValue} setEditorValue={setEditorValue} mode={SimpleEditorMode.Add} />
      </Grid>
    </SubCard>
  );
};

export default AddAddendum;
