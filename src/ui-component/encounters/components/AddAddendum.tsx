import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import { timeAdjuster } from 'helpers/timeAdjuster';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins, paddings } from 'themes/themeConstants';
import { IEncountersFormBody, SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';
import ParserTypographyWrapper from '@ui-component/common/Typography';

import { encountersCustomizedDate } from '../helpers/encountersDate';
import { getAddAddendumInitialValues } from '../helpers/initialValues';

import EncountersWrapper from './EncountersWrapper';

interface AddAddendumTitleProps {
  handleClose: () => void;
  encounterNoteEditedTime: string;
}

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

const AddAddendumTitle = ({ handleClose, encounterNoteEditedTime }: AddAddendumTitleProps) => {
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
          <Typography
            sx={{ color: (theme) => theme.palette.common.black, marginRight: margins.right20 }}
            fontSize="21px"
            fontWeight="400"
          >
            {t(Translation.PAGE_ENCOUNTERS_ADD_ADDENDUM)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={2} justifyContent="flex-end" pr={4}>
        <Typography variant="h4">{encounterNoteEditedTime}</Typography>
      </Grid>
    </Grid>
  );
};

const AddAddendum = () => {
  const router = useRouter();
  const currentEncounterId = useAppSelector(patientsSelector.currentEncounterId);
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const isCreateEncounterAddendumLoading = useAppSelector(patientsSelector.isCreateEncounterAddendumLoading);
  const [editorValue, setEditorValue] = useState<string>('');
  const encounterNoteEditedTime = timeAdjuster(new Date()).customizedDate;
  const encounterId = router.query.id as string;
  const [t] = useTranslation();
  const isEncounterNoteUpdated =
    new Date(encounterData?.createdOn as Date).getTime() !== new Date(encounterData?.updatedOn as Date).getTime();
  const encounterNoteUpdatedTime = encountersCustomizedDate(new Date(encounterData?.updatedOn as Date));
  const encounterNoteCreatedTime = encountersCustomizedDate(new Date(encounterData?.createdOn as Date));

  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  const methods = useForm({
    defaultValues: getAddAddendumInitialValues()
  });

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

  const onSubmit = useCallback(
    (values: IEncountersFormBody) => {
      if (values.content && encounterId) {
        dispatch(
          patientsMiddleware.createEncounterAddendum({
            encounterId,
            content: values.content
          })
        );
        closeImmediately();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorValue, encounterId]
  );

  return (
    <FormProvider {...methods}>
      <EncountersWrapper
        title={<AddAddendumTitle handleClose={handleClose} encounterNoteEditedTime={encounterNoteEditedTime} />}
      >
        <Grid container>
          <Grid item container xs={12} spacing={1} direction="column">
            <Grid item>
              <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{t(Translation.PAGE_ENCOUNTERS_CONSULTATION_IN_CLINIC)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}</Typography>
            </Grid>
            {encounterData && (
              <>
                <Grid item>
                  <ParserTypographyWrapper variant="subtitle1">{parse(encounterData.content)}</ParserTypographyWrapper>
                </Grid>
                <Grid item pt={paddings.top28}>
                  <Typography variant="h4">{encounterData.author}</Typography>
                  <Typography pt={paddings.top8}>
                    {isEncounterNoteUpdated
                      ? `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)} ${encounterNoteUpdatedTime}`
                      : `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encounterNoteCreatedTime}`}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
          <NoteEditor
            handleCancel={handleClose}
            setEditorValue={setEditorValue}
            handleSave={onSubmit}
            mode={SimpleEditorMode.Add_Addendum}
            loadingButtonState={isCreateEncounterAddendumLoading}
          />
        </Grid>
      </EncountersWrapper>
    </FormProvider>
  );
};

export default AddAddendum;
