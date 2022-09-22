import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogActions, Grid, Stack, Tooltip } from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';
import { AppointmentDetailsProps } from 'types/reduxTypes/booking';

import { mergeAppointmentDetails } from './helpers/mergeAppointmentDetails';

const FormActions: React.FC = () => {
  const [t] = useTranslation();
  const { appointmentId } = useAppSelector(viewsSelector.modal).props;
  const details: AppointmentDetailsProps = useAppSelector(
    bookingSelector.appointmentDetails
  ) as AppointmentDetailsProps;

  const { values }: FormikValues = useFormikContext();
  const onClose = () => dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));

  const onSave = () => {
    onClose();
    dispatch(bookingMiddleware.editAppointment(appointmentId, mergeAppointmentDetails(details, values)));
  };

  const onRemoveClick = () => {
    dispatch(
      viewsMiddleware.setModalState({ name: ModalName.ConfirmAppointmentCancelModal, props: { appointmentId } })
    );
    dispatch(bookingMiddleware.clearAppointmentDetails());
  };

  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL);
  const saveButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE);

  return (
    <DialogActions sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Tooltip title={t(Translation.MODAL_APPOINTMENTS_EDIT_ICON_DELETE)}>
            <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onRemoveClick} />
          </Tooltip>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <StyledButton variant="contained" onClick={onClose}>
              {cancelButtonLabel}
            </StyledButton>
            <StyledButton type="submit" variant="contained" onClick={onSave}>
              {saveButtonLabel}
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default FormActions;
