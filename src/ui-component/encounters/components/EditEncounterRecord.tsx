import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddendumsProps } from '@axios/patientEmr/managerPatientEmrTypes';
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
import { paddings } from 'themes/themeConstants';
import { SimpleEditorMode, SimpleEditorProps } from 'types/patient';

import usePreviousState from '@hooks/usePreviousState';
import useShouldOpenCancelChangesConfirmationModal from '@hooks/useShouldOpenCancelChangesConfirmationModal';
import ParserTypographyWrapper from '@ui-component/common/Typography';

import { encountersCustomizedDate } from '../helpers/encountersDate';

import CurrentAddendum from './CurrentAddendum';
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
          <IconButton onClick={handleClose}>
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
        <Typography variant="h4">{timeAdjuster(new Date(updatedOn as string)).customizedDate}</Typography>
      </Grid>
    </Grid>
  );
};

const EditEncounterRecord = ({ mode }: EditEncounterRecordProps) => {
  const [t] = useTranslation();
  const router = useRouter();
  const currentAddendumId = router.query.id as string;
  const currentEncounterId = useAppSelector(patientsSelector.currentEncounterId);
  const encounterData = useAppSelector(patientsSelector.encounterDetails);
  const [currentAddendum, setCurrentAddendum] = useState<AddendumsProps | null>(null);
  const [filteredAddendums, setFilteredAddendums] = useState<AddendumsProps[]>([]);
  const [editorValue, setEditorValue] = useState<string>('');
  const sanitizedValue = sanitize(editorValue);
  const previousEditorValue = usePreviousState(sanitizedValue, true);

  useShouldOpenCancelChangesConfirmationModal(sanitizedValue, previousEditorValue);

  useEffect(() => {
    // In case when user comes directly from URL or refreshed the page.
    if (!encounterData && mode === SimpleEditorMode.Edit_Note) {
      dispatch(patientsMiddleware.getEncounterDetailsInformation(currentEncounterId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEncounterId]);

  useEffect(() => {
    if (mode === SimpleEditorMode.Edit_Addendum && currentAddendum) {
      setEditorValue(currentAddendum.content);
    } else if (mode === SimpleEditorMode.Edit_Note && encounterData) {
      setEditorValue(encounterData.content);
    }
  }, [mode, currentAddendum, encounterData]);

  useEffect(() => {
    if (currentAddendumId) {
      const currentAddendumData = encounterData?.addendums.find((addendum) => addendum.id === currentAddendumId);
      const filteredAddendumsData = encounterData?.addendums.filter((addendum) => addendum.id !== currentAddendumId);

      if (currentAddendumData) {
        setCurrentAddendum(currentAddendumData);
      }

      if (filteredAddendumsData?.length) {
        setFilteredAddendums(filteredAddendumsData);
      }
    }
  }, [currentAddendumId, encounterData?.addendums]);

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
    if (mode === SimpleEditorMode.Edit_Note) {
      dispatch(
        patientsMiddleware.updateEncounterNote({
          id: currentEncounterId,
          content: editorValue
        })
      );
    } else if (mode === SimpleEditorMode.Edit_Addendum && currentAddendumId) {
      dispatch(
        patientsMiddleware.updateEncounterAddendum({
          id: currentAddendumId,
          content: editorValue
        })
      );
    }

    closeImmediately();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorValue, currentAddendumId, currentEncounterId]);

  const showFilteredAddendums = filteredAddendums.length && encounterData;

  return (
    <EncountersWrapper
      title={<EditEncounterAddendumTitle handleClose={handleClose} mode={mode} updatedOn={encounterData?.updatedOn} />}
    >
      <Grid container spacing={3} pt={paddings.top32}>
        <Grid item container xs={12} spacing={1} direction="column">
          {encounterData && (
            <>
              <Grid item>
                <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_TYPE)}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{t(Translation.PAGE_ENCOUNTERS_CONSULTATION_IN_CLINIC)}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}</Typography>
              </Grid>
              <Grid item mt={-1.5}>
                <ParserTypographyWrapper variant="subtitle1">
                  {parse(encounterData ? encounterData.content : '')}
                </ParserTypographyWrapper>
              </Grid>
              <Grid item container direction="column">
                <Typography component="h4" variant="h4">
                  {encounterData.author}
                </Typography>
                <Typography variant="body1" component="p">
                  {`${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encountersCustomizedDate(
                    new Date(encounterData.createdOn as Date)
                  )}`}
                </Typography>
              </Grid>
            </>
          )}
          {mode === SimpleEditorMode.Edit_Addendum && showFilteredAddendums
            ? filteredAddendums.map((filteredAddendum) => <CurrentAddendum currentAddendum={filteredAddendum} />)
            : null}
        </Grid>
        <NoteEditor
          handleCancel={handleClose}
          handleSave={handleSave}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          mode={mode}
          currentAddendum={currentAddendum}
          filteredAddendums={filteredAddendums}
        />
      </Grid>
    </EncountersWrapper>
  );
};

export default EditEncounterRecord;
