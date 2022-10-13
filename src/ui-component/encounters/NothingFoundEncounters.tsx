import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

const NothingFoundEncounters = () => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
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
      <Link
        sx={{
          cursor: 'pointer'
        }}
        color={theme.palette.common.black}
        fontSize="21px"
        fontWeight="400"
        href="http://localhost:3000/" // it's just for rejecting error
        underline="always"
      >
        {t(Translation.PAGE_ENCOUNTERS_CREATE_FIRST_ENCOUNTER)}
      </Link>
    </Box>
  );
};

export default NothingFoundEncounters;
