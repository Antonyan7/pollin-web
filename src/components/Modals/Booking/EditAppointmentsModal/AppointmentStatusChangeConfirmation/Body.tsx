import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppointmentStatusesThatRequireConfirmation } from '@components/Modals/Booking/EditAppointmentsModal/AppointmentStatusChangeConfirmation/types';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const Body = (props: { type: AppointmentStatusesThatRequireConfirmation }) => {
  const [t] = useTranslation();

  const { type } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>
          {type === AppointmentStatusesThatRequireConfirmation.NoShow
            ? t(Translation.MODAL_APPOINTMENTS_EDIT_CONFIRM_STATUS_CHANGE_NO_SHOW_DESCRIPTION)
            : t(Translation.MODAL_APPOINTMENTS_EDIT_CONFIRM_STATUS_CHANGE_DONE_DESCRIPTION)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Body;
