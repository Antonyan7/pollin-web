import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, Typography } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { IEncountersFormBody, SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';
import { DateUtil } from '@utils/date/DateUtil';

import encountersRedirect, { EncountersPageTypes } from '../helpers/encountersRedirect';
import { getAddEncounterInitialValues } from '../helpers/initialValues';

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
          <IconButton onClick={handleClose} data-cy={CypressIds.PAGE_PATIENT_CREATE_ENCOUNTER_BACK_BTN}>
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
  const encounterNoteEditedTime = DateUtil.formatDateOnly(new Date());
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const router = useRouter();
  const methods = useForm<IEncountersFormBody>({
    defaultValues: getAddEncounterInitialValues()
  });

  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  const closeImmediately = (): void => encountersRedirect(router, EncountersPageTypes.BACK);

  const handleClose = (): void => {
    const shouldClosePage = sanitizedValue === previousEditorValue;

    if (shouldClosePage) {
      closeImmediately();
    } else {
      router.back();
    }
  };

  const onSubmit = useCallback(
    (values: IEncountersFormBody) => {
      const body = {
        ...values,
        patientId
      };

      dispatch(patientsMiddleware.createEncounterNote(body));
      closeImmediately();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patientId]
  );

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id));
    }
  }, [router.query.id]);

  return (
    <FormProvider {...methods}>
      <EncountersWrapper
        title={<AddEncounterNoteTitle handleClose={handleClose} encounterNoteEditedTime={encounterNoteEditedTime} />}
      >
        <Grid container mt={1}>
          <Grid container>
            <NoteEditor
              setEditorValue={setEditorValue}
              mode={SimpleEditorMode.Add_Note}
              handleSave={onSubmit}
              handleCancel={handleClose}
              loadingButtonState={isCreateEncounterNoteLoading}
            />
          </Grid>
        </Grid>
      </EncountersWrapper>
    </FormProvider>
  );
};

export default AddEncounterNote;
