import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddendumsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { Divider, Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import parse from 'html-react-parser';
import { margins } from 'themes/themeConstants';

import ParserTypographyWrapper from '@ui-component/common/Typography';

import { encountersCustomizedDate } from '../helpers/encountersDate';

interface CurrentAddendumProps {
  currentAddendum: AddendumsProps | null;
}

const CurrentAddendum = ({ currentAddendum }: CurrentAddendumProps) => {
  const [t] = useTranslation();
  const isEditedTitle = currentAddendum?.isEdited
    ? t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_UPDATED_ON)
    : t(Translation.PAGE_ENCOUNTERS_ENCOUNTER_CREATED_ON);

  return (
    currentAddendum && (
      <Grid item container direction="column" gap={2}>
        <Divider variant="fullWidth" />
        <Grid item container direction="row" alignItems="center">
          <Typography variant="h4" sx={{ width: '130px' }}>
            {t(Translation.PAGE_ENCOUNTERS_ADDENDUM_TITLE)}
          </Typography>
        </Grid>
        <Grid item>
          <ParserTypographyWrapper variant="body1">{parse(currentAddendum.content)}</ParserTypographyWrapper>
        </Grid>
        <Grid item container direction="column" mb={margins.bottom16}>
          <Typography variant="h4">{currentAddendum.author}</Typography>
          <Typography variant="body1">
            {`${isEditedTitle} ${encountersCustomizedDate(new Date(currentAddendum.date as Date))}`}
          </Typography>
        </Grid>
      </Grid>
    )
  );
};

export default CurrentAddendum;
