import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppointmentStatusesThatRequireConfirmation,
  IAppointmentStatusChangeConfirmationModalProps
} from '@components/Modals/Booking/EditAppointmentsModal/AppointmentStatusChangeConfirmation/types';
import { DialogContent, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

const AppointmentStatusChangeConfirmationModal = (props: IAppointmentStatusChangeConfirmationModalProps) => {
  const [t] = useTranslation();
  const { type, appointmentId, values } = props;
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AppointmentStatusChangeConfirmationModal));
  }, []);

  return (
    <BaseModal
      isLoading={false}
      onClose={onClose}
      title={
        type === AppointmentStatusesThatRequireConfirmation.NoShow
          ? t(Translation.MODAL_APPOINTMENTS_EDIT_CONFIRM_STATUS_CHANGE_NO_SHOW_TITLE)
          : t(Translation.MODAL_APPOINTMENTS_EDIT_CONFIRM_STATUS_CHANGE_DONE_TITLE)
      }
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body type={type} />
            </Grid>
            <Grid item xs={12}>
              <Actions appointmentId={appointmentId} values={values} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default AppointmentStatusChangeConfirmationModal;
