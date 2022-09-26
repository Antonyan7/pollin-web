import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Translation } from '../../constants/translations';

const AppointmentsHeader = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  const onNewCalendarClick = useCallback(() => {
    window.open(window.location.href, '_blank');
  }, []);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <StyledButtonNew theme={theme} variant="outlined" endIcon={<OpenInNewIcon />} onClick={onNewCalendarClick}>
        <Typography variant="h4" sx={{ marginRight: '10px' }}>
          {t(Translation.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR)}
        </Typography>
      </StyledButtonNew>
    </header>
  );
};

export default AppointmentsHeader;
