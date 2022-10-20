import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { borderRadius } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const FormActions = () => {
  const [t] = useTranslation();
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentId = details?.appointment.id ?? '';
  const onCancelAppointmentClick = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelAppointmentModal, props: { appointmentId } }));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, [appointmentId]);
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppoitmentLoading);

  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL);
  const saveButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE);

  return (
    <DialogActions sx={{ p: 3, paddingTop: '10px' }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <StyledButton sx={{ width: '160px' }} variant="outlined" onClick={onCancelAppointmentClick}>
            {cancelButtonLabel}
          </StyledButton>
        </Grid>
        <Grid item>
          <ButtonWithLoading
            isLoading={isConfirmationLoading}
            sx={{ width: '60px', borderRadius: borderRadius.radius8 }}
            type="submit"
            variant="contained"
          >
            {saveButtonLabel}
          </ButtonWithLoading>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
