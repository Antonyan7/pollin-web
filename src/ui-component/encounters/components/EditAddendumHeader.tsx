import React from 'react';
import { useTranslation } from 'react-i18next';
import { IEncounterDetailsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import parse from 'html-react-parser';
import { SimpleEditorMode } from 'types/patient';

import ParserTypographyWrapper from '@ui-component/common/Typography';

import { encountersCustomizedDate } from '../helpers/encountersDate';

interface EditAddendumHeaderProps {
  mode: SimpleEditorMode;
  encounterData: IEncounterDetailsProps;
}

const EditAddendumHeader = ({ mode, encounterData }: EditAddendumHeaderProps) => {
  const [t] = useTranslation();
  const isEncounterNoteUpdated =
    new Date(encounterData?.createdOn as Date).getTime() !== new Date(encounterData?.updatedOn as Date).getTime();
  const encounterNoteUpdatedTime = encountersCustomizedDate(new Date(encounterData?.updatedOn as Date));
  const encounterNoteCreatedTime = encountersCustomizedDate(new Date(encounterData?.createdOn as Date));

  return mode === SimpleEditorMode.Edit_Addendum ? (
    <>
      <Grid item>
        <Typography variant="subtitle2">{t(Translation.PAGE_ENCOUNTERS_ADDENDUM_NOTE)}</Typography>
      </Grid>
      <Grid item mt={-1}>
        <ParserTypographyWrapper variant="subtitle1">
          {parse(encounterData ? encounterData.content : '')}
        </ParserTypographyWrapper>
      </Grid>
      <Grid item container direction="column">
        <Typography variant="h4">{encounterData.author}</Typography>
        <Typography variant="body1">
          {isEncounterNoteUpdated
            ? `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)} ${encounterNoteUpdatedTime}`
            : `${t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON)} ${encounterNoteCreatedTime}`}
        </Typography>
      </Grid>
    </>
  ) : null;
};

export default EditAddendumHeader;
