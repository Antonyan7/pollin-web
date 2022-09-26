import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, Grid, Stack } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';

const FormActions: React.FC = () => {
  const [t] = useTranslation();
  const providerId = useAppSelector(bookingSelector.serviceProviderId);
  const { values }: FormikValues = useFormikContext();

  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_CANCEL);
  const addButtonLabel = t(Translation.MODAL_APPOINTMENTS_ADD_BUTTON_ADD);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
    dispatch(bookingMiddleware.getPatients(null));
    dispatch(bookingMiddleware.getPatientAlerts(''));
  }, []);

  const onAdd = useCallback(() => {
    const body: ICreatedAppointmentBody = {
      ...values,
      providerId
    };

    dispatch(bookingMiddleware.createAppointment(body));
    onClose();
  }, [values, providerId, onClose]);

  return (
    <DialogActions sx={{ p: 3 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <StyledButton type="button" variant="contained" onClick={onClose}>
              {cancelButtonLabel}
            </StyledButton>
            <StyledButton variant="contained" type="submit" onClick={onAdd}>
              {addButtonLabel}
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
