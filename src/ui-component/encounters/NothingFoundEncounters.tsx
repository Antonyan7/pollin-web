import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

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
      <Button
        variant="outlined"
        sx={{
          padding: paddings.all12
        }}
      >
        {t(Translation.PAGE_ENCOUNTERS_CREATE_FIRST_ENCOUNTER)}
      </Button>
    </Box>
  );
};

export default NothingFoundEncounters;
