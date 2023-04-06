import React from 'react';
import { useTranslation } from 'react-i18next';
import { IEditAppointmentBody } from '@axios/booking/managerBookingTypes';
import { DialogActions, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const Actions = (props: { appointmentId: string; values: IEditAppointmentBody }) => {
  const [t] = useTranslation();

  const { appointmentId, values } = props;
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppointmentEditLoading);

  const handleEditAppointment = () => {
    dispatch(bookingMiddleware.editAppointment(appointmentId, values));
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isConfirmationLoading}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={handleEditAppointment}
            >
              {t(Translation.MODAL_CONFIRM_MACHINE_BUTTON_CONFIRM)}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
