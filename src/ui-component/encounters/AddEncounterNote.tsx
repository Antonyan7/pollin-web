import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';
import SubCardStyled from '@ui-component/cards/SubCardStyled';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const AddEncounterNote = () => {
  const [editorValue, setEditorValue] = useState<string>('Encounter Note');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const [filterTypes, setFilterTypes] = useState<string>('');
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const [t] = useTranslation();
  const router = useRouter();

  // Remove all html tags from textVor for compare and decide should show modal or not.
  const sanitizedValue: string = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

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
      patientsMiddleware.createEncounterNote({
        patientId,
        encountersTypeId: filterTypes,
        content: editorValue
      })
    );
    closeImmediately();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTypes, editorValue]);

  const handleCancel = () => {
    handleClose();
  };

  const handleEncounterTypeSelect = useCallback((event: SelectChangeEvent) => {
    setFilterTypes(event.target.value as string);
  }, []);

  return (
    <SubCardStyled
        content
        sx={{
          '& > MuiCardHeader-root': {
            padding: 0
          }
        }}
        title={
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid container item xs={6} sx={{ p: 0.5 }} alignItems="center">
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
                  {t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={2} justifyContent="flex-end" pr={3}>
              <Typography variant="h4">{encounterNoteEditedTime}</Typography>
            </Grid>
          </Grid>
        }
      >
        <Grid container mt={1}>
          <Grid container>
            <NoteEditor
              handleEncounterTypeSelect={handleEncounterTypeSelect}
              editorValue={editorValue}
              setEditorValue={setEditorValue}
              mode={SimpleEditorMode.Add}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </Grid>
        </Grid>
      </SubCardStyled>
  );
};

export default AddEncounterNote;
