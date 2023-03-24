import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddendumsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, IconButton, Typography } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import sanitize from 'helpers/sanitize';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { IEncountersFormBody, IEncountersFormDefaultProps, SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';
import CircularLoading from '@ui-component/circular-loading';
import { DateUtil } from '@utils/date/DateUtil';

import { getEditEncounterInitialValues } from '../helpers/initialValues';

import CurrentAddendum from './CurrentAddendum';
import EditAddendumHeader from './EditAddendumHeader';
import EncountersWrapper from './EncountersWrapper';

const NoteEditor = dynamic<SimpleEditorProps>(() => import('@ui-component/SimpleTextEditor'), { ssr: false });

interface EditEncounterRecordProps {
  mode: SimpleEditorMode;
}
interface EditEncounterAddendumTitleProps {
  handleClose: () => void;
  mode: SimpleEditorMode;
  updatedOn?: string | Date;
}

const EditEncounterAddendumTitle = ({ handleClose, mode, updatedOn }: EditEncounterAddendumTitleProps) => {
  const [t] = useTranslation();

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid container item xs={6} sx={{ p: 2 }} alignItems="center">
        <Grid item xs={1}>
          <IconButton onClick={handleClose} data-cy={CypressIds.PAGE_PATIENT_EDIT_ENCOUNTER_BACK_BTN}>
            <ArrowBackIosIcon sx={{ color: (theme) => theme.palette.primary.main }} />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ color: (theme) => theme.palette.common.black }} fontSize="21px" fontWeight="400">
            {mode === SimpleEditorMode.Edit_Note
              ? t(Translation.PAGE_ENCOUNTERS_EDIT_ENCOUNTER_NOTE)
              : t(Translation.PAGE_ENCOUNTERS_EDIT_ADDENDUM)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={2} justifyContent="flex-end" pr={2}>
        <Typography variant="h4">{updatedOn ? DateUtil.formatDateOnly(updatedOn) : updatedOn}</Typography>
      </Grid>
    </Grid>
  );
};

const EditAddendumHeaderTitle = () => {
  const [t] = useTranslation();

  return (
    <>
      <Grid item>
        <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{t(Translation.PAGE_ENCOUNTERS_CONSULTATION_IN_CLINIC)}</Typography>
      </Grid>
    </>
  );
};

const EditEncounterRecord = ({ mode }: EditEncounterRecordProps) => {
  const router = useRouter();
  const currentAddendumId = router.query.addendumId as string;
  const currentEncounterId = useAppSelector(patientsSelector.currentEncounterId);
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const isUpdateEncounterNoteLoading = useAppSelector(patientsSelector.isUpdateEncounterNoteLoading);
  const isUpdateEncounterAddendumLoading = useAppSelector(patientsSelector.isUpdateEncounterAddendumLoading);
  const isEncountersDetailsLoading = useAppSelector(patientsSelector.isEncountersDetailsLoading);
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const [currentAddendum, setCurrentAddendum] = useState<AddendumsProps | null>(null);
  const [firstPartAddendums, setFirstPartAddendums] = useState<AddendumsProps[]>([]);
  const [secondPartAddendums, setSecondPartAddendums] = useState<AddendumsProps[]>([]);
  const [editorValue, setEditorValue] = useState<string>('');
  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);
  const methods = useForm<IEncountersFormBody>({
    defaultValues: getEditEncounterInitialValues()
  });
  const { setValue } = methods;

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  useEffect(() => {
    if (!encounterData && mode === SimpleEditorMode.Edit_Note) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(currentEncounterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEncounterId]);

  useEffect(() => {
    if (!currentEncounterId && mode === SimpleEditorMode.Edit_Note) {
      dispatch(patientsMiddleware.setCurrentEncounterId(router.query.encounterId as string));
    }
  }, [currentEncounterId, mode, router.query.encounterId]);

  useEffect(() => {
    if (mode === SimpleEditorMode.Edit_Addendum && currentAddendum) {
      Object.entries(getEditEncounterInitialValues({ content: currentAddendum.content })).map(
        ([addendumKey, addendumValue]) => setValue(addendumKey as keyof IEncountersFormDefaultProps, addendumValue)
      );
    } else if (mode === SimpleEditorMode.Edit_Note && encounterData) {
      Object.entries(getEditEncounterInitialValues({ content: encounterData.content })).map(([noteKey, noteValue]) =>
        setValue(noteKey as keyof IEncountersFormDefaultProps, noteValue)
      );
    }
  }, [mode, currentAddendum, encounterData, setValue]);

  useEffect(() => {
    if (currentAddendumId && encounterData?.addendums.length) {
      const currentAddendumData = encounterData?.addendums.find((addendum) => addendum.id === currentAddendumId);
      const currentAddendumIndex = encounterData?.addendums.indexOf(currentAddendumData as AddendumsProps);
      const firstAddendumPart: AddendumsProps[] = encounterData?.addendums.slice().splice(0, currentAddendumIndex);
      const secondAddendumPart: AddendumsProps[] = encounterData?.addendums.slice().splice(currentAddendumIndex + 1);

      if (currentAddendumData) {
        setCurrentAddendum(currentAddendumData);
      }

      if (firstAddendumPart?.length) {
        setFirstPartAddendums(firstAddendumPart);
      }

      if (secondAddendumPart?.length) {
        setSecondPartAddendums(secondAddendumPart);
      }
    }
  }, [currentAddendumId, encounterData?.addendums]);

  const closeImmediately = (): void => {
    router.push(`/patient-emr/details/${currentPatientId}/encounters/encounter/${currentEncounterId}`);
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
    (values: IEncountersFormDefaultProps) => {
      if (mode === SimpleEditorMode.Edit_Note) {
        dispatch(
          patientsMiddleware.updateEncounterNote({
            id: currentEncounterId,
            content: values.content
          })
        );
      } else if (mode === SimpleEditorMode.Edit_Addendum && currentAddendumId) {
        dispatch(
          patientsMiddleware.updateEncounterAddendum({
            id: currentAddendumId,
            content: values.content
          })
        );
      }

      closeImmediately();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorValue, currentAddendumId, currentEncounterId, mode]
  );

  const showFilteredAddendums = firstPartAddendums.length && encounterData;

  return encounterData && !isEncountersDetailsLoading ? (
    <FormProvider {...methods}>
      <EncountersWrapper
        title={
          <EditEncounterAddendumTitle handleClose={handleClose} mode={mode} updatedOn={encounterData?.createdOn} />
        }
      >
        <Grid container>
          <Grid item container xs={12} spacing={1} direction="column">
            <EditAddendumHeaderTitle />
            <EditAddendumHeader mode={mode} encounterData={encounterData} />
            {mode === SimpleEditorMode.Edit_Addendum && showFilteredAddendums
              ? firstPartAddendums.map((addendum) => <CurrentAddendum currentAddendum={addendum} key={addendum.id} />)
              : null}
          </Grid>
          <NoteEditor
            handleCancel={handleClose}
            handleSave={onSubmit}
            setEditorValue={setEditorValue}
            mode={mode}
            secondPartAddendums={secondPartAddendums}
            loadingButtonState={isUpdateEncounterNoteLoading ?? isUpdateEncounterAddendumLoading}
          />
        </Grid>
      </EncountersWrapper>
    </FormProvider>
  ) : (
    <CircularLoading />
  );
};

export default EditEncounterRecord;
