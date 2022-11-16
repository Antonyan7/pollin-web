import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import { timeAdjuster } from 'helpers/timeAdjuster';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';

import EncountersWrapper from './EncountersWrapper';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

interface AddEncounterNoteTitleProps {
  handleClose: () => void;
  encounterNoteEditedTime: string;
}

const AddEncounterNoteTitle = ({ handleClose, encounterNoteEditedTime }: AddEncounterNoteTitleProps) => {
  const [t] = useTranslation();

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid container item xs={6} sx={{ p: 2 }} alignItems="center">
        <Grid item xs={1}>
          <IconButton onClick={handleClose}>
            <ArrowBackIosIcon sx={{ color: (theme) => theme.palette.primary.main }} />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ color: (theme) => theme.palette.common.black }} fontSize="21px" fontWeight="400">
            {t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={2} justifyContent="flex-end" pr={2}>
        <Typography variant="h4">{encounterNoteEditedTime}</Typography>
      </Grid>
    </Grid>
  );
};

const AddEncounterNote = () => {
  const isCreateEncounterNoteLoading = useAppSelector(patientsSelector.isCreateEncounterNoteLoading);
  const [editorValue, setEditorValue] = useState<string>('');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const [filterTypes, setFilterTypes] = useState<string>('');
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const router = useRouter();

  // Remove all html tags from textVor for compare and decide should show modal or not.
  const sanitizedValue: string = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  const closeImmediately = (): void => {
    router.push(`/patient-emr/details/${patientId}/encounters`);
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
    if (filterTypes.length && editorValue) {
      dispatch(
        patientsMiddleware.createEncounterNote({
          patientId,
          encountersTypeId: filterTypes,
          content: editorValue
        })
      );
      closeImmediately();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTypes, editorValue]);

  const handleEncounterTypeSelect = useCallback((event: SelectChangeEvent) => {
    setFilterTypes(event.target.value as string);
  }, []);

  return (
    <EncountersWrapper
      title={<AddEncounterNoteTitle handleClose={handleClose} encounterNoteEditedTime={encounterNoteEditedTime} />}
    >
      <Grid container mt={1}>
        <Grid container>
          <NoteEditor
            handleEncounterTypeSelect={handleEncounterTypeSelect}
            editorValue={editorValue}
            setEditorValue={setEditorValue}
            mode={SimpleEditorMode.Add_Note}
            handleSave={handleSave}
            handleCancel={handleClose}
            loadingButtonState={isCreateEncounterNoteLoading}
          />
        </Grid>
      </Grid>
    </EncountersWrapper>
  );
};

export default AddEncounterNote;
