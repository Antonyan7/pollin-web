import React from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borderRadius, margins } from 'themes/themeConstants';

import encountersRedirect, { EncountersPageTypes } from '../helpers/encountersRedirect';

import EncounterFilters from './EncounterFilters';

const EncounterNotesHeader = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();

  const handleCreateEncounterNoteClick = () => encountersRedirect(router, EncountersPageTypes.ADD_ENCOUNTER);

  return (
    <Box mt={margins.top16}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            color: theme.palette.common.black
          }}
          fontSize="21px"
          fontWeight="500"
        >
          {t(Translation.PAGE_ENCOUNTERS_LIST_TITLE)}
        </Typography>
        <Button
          sx={{
            color: theme.palette.common.white,
            borderRadius: borderRadius.radius8
          }}
          variant="contained"
          endIcon={
            <IconButton>
              <AddIcon sx={{ color: theme.palette.common.white }} />
            </IconButton>
          }
          onClick={handleCreateEncounterNoteClick}
        >
          {t(Translation.PAGE_ENCOUNTERS_CREATE_ENCOUNTER)}
        </Button>
      </Grid>
      <EncounterFilters page={page} />
    </Box>
  );
};

export default EncounterNotesHeader;
