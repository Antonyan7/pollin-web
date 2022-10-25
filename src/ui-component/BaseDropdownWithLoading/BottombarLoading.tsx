import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const BottombarLoading = () => {
  const [t] = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: (theme) => theme.palette.primary[200],
        width: '100%',
        position: 'absolute',
        height: 40,
        px: '5%'
      }}
    >
      <Typography variant="subtitle2" pr={2} sx={{ color: (theme) => theme.palette.primary.dark }}>
        {t(Translation.BASE_DROPDOWN_LOADING_MORE)}...
      </Typography>
      <CircularProgress color="primary" size={16} />
    </Box>
  );
};

export default BottombarLoading;
