import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import { Typography, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const AppointmentsHeader = () => {
  const theme = useTheme();
  const [t] = useTranslation();

  const onNewCalendarClick = useCallback(() => {
    window.open(window.location.href, '_blank');
  }, []);

  const AppointmentsNewCalendarButtonCyId = CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR;
  const AppointmentsSendBookingRequestButtonCyId = CypressIds.PAGE_APPOINTMENTS_BUTTON_SEND_BOOKING_REQUEST;

  const handleSendBookingRequestModalOpen = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.SendBookingRequestToPatientModal,
        props: {
          isPatientProfile: false,
          patientId: ''
        }
      })
    );
  }, []);

  return (
    // TODO: Styling of this component should be changed TEAMA-4807
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: margins.top8
      }}
    >
      <StyledButtonNew
        data-cy={AppointmentsNewCalendarButtonCyId}
        theme={theme}
        variant="outlined"
        endIcon={<OpenInNewIcon />}
        onClick={onNewCalendarClick}
      >
        <Typography color={theme.palette.primary.main} variant="subtitle1" sx={{ marginRight: margins.right12 }}>
          {t(Translation.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR)}
        </Typography>
      </StyledButtonNew>

      <StyledButtonNew
        data-cy={AppointmentsSendBookingRequestButtonCyId}
        theme={theme}
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleSendBookingRequestModalOpen}
      >
        <Typography color={theme.palette.primary.main} variant="subtitle1" sx={{ marginRight: margins.right12 }}>
          {t(Translation.PAGE_APPOINTMENTS_SEND_BOOKING_REQUEST_BUTTON_TITLE)}
        </Typography>
      </StyledButtonNew>
    </header>
  );
};

export default AppointmentsHeader;
