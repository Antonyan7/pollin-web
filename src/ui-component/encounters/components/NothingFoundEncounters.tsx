import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';
import { IEncounterList } from 'types/reduxTypes/patient-emrStateTypes';

const NothingFoundEncounters = () => {
  const encountersList: IEncounterList = useAppSelector(patientsSelector.encountersList);
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const isFirstCreationAvailable = !encountersList.encounters.length && !isEncountersListLoading;
  const [t] = useTranslation();
  const theme = useTheme();
  const { query, push } = useRouter();

  const onCreateFirstEncounter = useCallback(() => {
    push(`/patient-emr/details/${query.id}/add-note`);
  }, [push, query.id]);

  return isFirstCreationAvailable ? (
    <Box sx={{ textAlign: 'center', marginTop: margins.top150 }}>
      <Typography
        sx={{
          color: theme.palette.common.black,
          marginBottom: margins.bottom20,
          fontSize: theme.typography.pxToRem(21)
        }}
        fontWeight="400"
      >
        {t(Translation.PAGE_ENCOUNTERS_NOTHING_FOUND)}
      </Typography>
      <Button
        variant="outlined"
        onClick={onCreateFirstEncounter}
        sx={{
          padding: paddings.all16,
          border: `${borders.solid2px} ${theme.palette.primary.main}`,
          fontWeight: 400,
          fontSize: theme.typography.pxToRem(14)
        }}
      >
        {t(Translation.PAGE_ENCOUNTERS_CREATE_FIRST_ENCOUNTER)}
      </Button>
    </Box>
  ) : null;
};

export default NothingFoundEncounters;
