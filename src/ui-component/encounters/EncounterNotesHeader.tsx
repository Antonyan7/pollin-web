import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translation } from 'constants/translations';
import Image from 'next/image';
import { useRouter } from 'next/router';

import plusIcon from '@assets/images/patient/icons/plusIcon.svg';
import EncounterFilters from '@ui-component/encounters/EncounterFilters';

const EncounterNotesHeader = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();

  const handleCreateEncounterNoteClick = () => router.push(`${router.asPath}/add-note`);

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
          sx={{ color: 'black', height: '45px', borderRadius: '7px', borderColor: theme.palette.grey[400] }}
          variant="outlined"
          endIcon={<Image src={plusIcon} />}
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
