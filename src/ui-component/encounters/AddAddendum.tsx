import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';

import SubCardStyled from '../cards/SubCardStyled';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const AddAddendum = () => {
  const router = useRouter();
  const currentEncounterId = useAppSelector(patientsSelector.currentEncounterId);
  const [editorValue, setEditorValue] = useState<string>('');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const encounterId = router.query.id as string;
  const [t] = useTranslation();

  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  const closeImmediately = (): void => {
    router.push(`/patient-emr/encounter/${currentEncounterId}`);
  };

  const handleClose = (): void => {
    const shouldClosePage = sanitizedValue === previousEditorValue;

    if (shouldClosePage) {
      closeImmediately();
    } else {
      router.back();
    }
  };

  const handleSave = useCallback(() => {
    dispatch(
      patientsMiddleware.createEncounterAddendum({
        encounterId,
        content: editorValue
      })
    );
    closeImmediately();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorValue, encounterId]);

  return (
    <SubCardStyled
      content
      title={
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid container item xs={6} alignItems="center">
            <Grid item xs={1}>
              <IconButton onClick={handleClose}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{ color: (theme) => theme.palette.common.black, marginRight: margins.right20 }}
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
        <NoteEditor
          handleCancel={handleClose}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          handleSave={handleSave}
          mode={SimpleEditorMode.Add_Addendum}
        />
      </Grid>
    </SubCardStyled>
  );
};

export default AddAddendum;
