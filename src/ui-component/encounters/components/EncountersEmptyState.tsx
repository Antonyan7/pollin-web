import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, styled, Typography, TypographyProps, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { IEncounterList } from 'types/reduxTypes/patient-emrStateTypes';

import NothingFoundEncounters from './NothingFoundEncounters';

const NoResultsText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.pxToRem(21),
  color: theme.palette.common.black,
  fontWeight: 500,
  margin: margins.all16
}));

const NoResultsState = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const encountersList: IEncounterList = useAppSelector(patientsSelector.encountersList);

  return !encountersList.encounters.length ? (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: margins.top150
      }}
    >
      <NoResultsText theme={theme}>{t(Translation.PAGE_ENCOUNTERS_NO_RESULTS_FOUND)}</NoResultsText>
      <NoResultsText theme={theme}>{t(Translation.PAGE_ENCOUNTERS_NO_RESULTS_TRY_AGAIN)}</NoResultsText>
    </Box>
  ) : null;
};

const EncountersEmptyState = () => {
  const encountersSearchValue = useAppSelector(patientsSelector.encountersSearchValue);
  const selectedEncountersFilters = useAppSelector(patientsSelector.selectedEncountersFilters);
  const showFirstCreation = !encountersSearchValue.length && !selectedEncountersFilters.length;

  return showFirstCreation ? <NothingFoundEncounters /> : <NoResultsState />;
};

export default EncountersEmptyState;
