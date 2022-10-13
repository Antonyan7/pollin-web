import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { margins } from 'themes/themeConstants';

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
      <StyledButtonNew
        sx={{
          marginTop: margins.top16,
          '& > span > svg': {
            width: 24,
            height: 24
          }
        }}
        theme={theme}
        variant="contained"
        endIcon={<AddIcon />}
        onClick={onNewCalendarClick}
      >
        <Typography color={theme.palette.common.white} variant="h4" sx={{ marginRight: margins.right12 }}>
          {t(Translation.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR)}
        </Typography>
      </StyledButtonNew>
    </header>
  );
};

export default AppointmentsHeader;
