import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, Divider, Grid } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

const FormActions: React.FC = () => {
  const [t] = useTranslation();
  const { appointmentId } = useAppSelector(viewsSelector.modal).props;

  const onCancelAppointmentClick = useCallback(() => {
    dispatch(
      viewsMiddleware.setModalState({ name: ModalName.ConfirmAppointmentCancelModal, props: { appointmentId } })
    );
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, [appointmentId]);

  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL);
  const saveButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE);

  return (
    <>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <StyledButton variant="outlined" onClick={onCancelAppointmentClick}>
              {cancelButtonLabel}
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton type="submit" variant="contained">
              {saveButtonLabel}
            </StyledButton>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default FormActions;
