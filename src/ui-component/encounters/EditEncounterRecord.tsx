import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';
import SubCardStyled from 'ui-component/cards/SubCardStyled';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const EditEncounterRecord = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const encounterNoteEditedTime = encounterData?.updatedOn
    ? timeAdjuster(new Date(encounterData.updatedOn as string)).customizedDate
    : '';
  const [editorValue, setEditorValue] = useState<string>(encounterData?.content as string);
  const encounterId = router.query.id as string;

  // Remove all html tags from textVor for compare and decide should show modal or not.
  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  useEffect(() => {
    // In case when user comes directly from URL or refreshed the page.
    if (!encounterData) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(encounterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounterId]);

  const closeImmediately = (): void => {
    const backTo = router.asPath.split('/').slice(0, 4).join('/');

    router.push(backTo);
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
      patientsMiddleware.updateEncounterNote({
        id: encounterId as string,
        content: editorValue
      })
    );
    closeImmediately();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    handleClose();
  };

  return (
    <SubCardStyled
      sx={{
        outline: '1px solid #D2DDD8',
        '& > MuiCardHeader-root': {
          p: 0
        }
      }}
      title={
        <Grid spacing={2} container alignItems="center" justifyContent="space-between">
          <Grid
            container
            item
            xs={6}
            ml={4}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Grid item xs={1}>
              <IconButton onClick={handleClose}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <Typography
                sx={{ color: (theme) => theme.palette.common.black, marginRight: '20px' }}
                fontSize="21px"
                fontWeight="400"
              >
                {t(Translation.PAGE_ENCOUNTERS_EDIT_ENCOUNTER_NOTE)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={2} justifyContent="flex-end" mr={4}>
            <Typography variant="h4">{encounterNoteEditedTime}</Typography>
          </Grid>
        </Grid>
      }
    >
      <Grid container spacing={3} pt={4}>
        <Grid item container xs={6} spacing={2} ml={3} direction="column">
          <Grid item>
            <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{t(Translation.PAGE_ENCOUNTERS_CONSULTATION_IN_CLINIC)}</Typography>
          </Grid>
        </Grid>
        <NoteEditor
          handleCancel={handleCancel}
          handleSave={handleSave}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          mode={SimpleEditorMode.Edit}
        />
      </Grid>
    </SubCardStyled>
  );
};

export default EditEncounterRecord;
