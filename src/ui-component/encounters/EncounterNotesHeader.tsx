import React from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';

import EncounterFilters from '@ui-component/encounters/EncounterFilters';

const EncounterNotesHeader = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();

  const handleCreateEncounterNoteClick = () => router.push(`/patient-emr/details/${router.query.id}/add-note`);

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
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
            height: '45px',
            borderRadius: '7px',
            borderColor: theme.palette.grey[400]
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
      </header>
      <EncounterFilters page={page} />
    </Box>
  );
};

export default EncounterNotesHeader;
