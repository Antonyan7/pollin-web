import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { CypressIds } from 'constants/cypressIds';
import { margins } from 'themes/themeConstants';

export const CalendarLoading = ({ message }: { message?: string }) => {
  const loadingSx = {
    display: 'grid',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 300
  };

  return (
    <Box sx={loadingSx}>
      <CircularProgress
        sx={{ margin: margins.auto }}
        size={70}
        data-cy={CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR}
      />
      <span style={{ marginTop: margins.top20 }}>{message}</span>
    </Box>
  );
};
