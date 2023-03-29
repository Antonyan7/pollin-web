import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
import { DialogActions, Grid } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { AppointmentStatus } from 'types/reduxTypes/bookingStateTypes';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const FormActions = ({ isSaveDisabled }: { isSaveDisabled: boolean }) => {
  const [t] = useTranslation();
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const appointmentId = details?.appointment.id ?? '';
  const onCancelAppointmentClick = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelAppointmentModal, props: { appointmentId } }));
  }, [appointmentId]);
  const isConfirmationLoading = useAppSelector(bookingSelector.isAppointmentEditLoading);
  const cancelButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL);
  const saveButtonLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE);

  const cancelButtonLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL;
  const saveButtonLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE;

  return (
    <DialogActions sx={{ padding: `${paddings.top32} ${paddings.right8} ${paddings.bottom24} ${paddings.left8}` }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          {details?.appointment.status !== AppointmentStatus.Done ? (
            <StyledButton data-cy={cancelButtonLabelCyId} variant="outlined" onClick={onCancelAppointmentClick}>
              {cancelButtonLabel}
            </StyledButton>
          ) : null}
        </Grid>
        <Grid item>
          <ButtonWithLoading
            data-cy={saveButtonLabelCyId}
            disabled={isSaveDisabled}
            isLoading={isConfirmationLoading}
            sx={{ width: '60px' }}
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
