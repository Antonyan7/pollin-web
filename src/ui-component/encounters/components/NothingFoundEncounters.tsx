import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borders, margins, paddings } from 'themes/themeConstants';
import { IEncounterList } from 'types/reduxTypes/patient-emrStateTypes';

const NothingFoundEncounters = () => {
  const encountersList: IEncounterList = useAppSelector(patientsSelector.encountersList);
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const isEncounterListAvailable = useMemo(
    () => !isEncountersListLoading && !encountersList.encounters.length,
    [encountersList.encounters.length, isEncountersListLoading]
  );
  const [t] = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const onCreateFirstEncounter = useCallback(() => {
    router.push(`/patient-emr/details/${router.query.id}/add-note`);
  }, [router]);

  return isEncounterListAvailable ? (
    <Box sx={{ textAlign: 'center', marginTop: margins.top150 }}>
      <Typography
        sx={{
          color: theme.palette.common.black,
          marginBottom: margins.bottom20
        }}
        fontSize="21px"
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
          fontSize: '14px'
        }}
      >
        {t(Translation.PAGE_ENCOUNTERS_CREATE_FIRST_ENCOUNTER)}
      </Button>
    </Box>
  ) : null;
};

export default NothingFoundEncounters;
