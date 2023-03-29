import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/common/MaterialComponents';
import { DialogActions, DialogContent, Grid, Stack } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { AppointmentStatus, AppointmentStatusEnumKey } from 'types/reduxTypes/bookingStateTypes';

import DialogContentRow from '@ui-component/common/DialogContentRow';
import BaseModal from '@ui-component/Modal/BaseModal';
import { DateUtil } from '@utils/date/DateUtil';

export interface DetailsAppointmentModalProps {
  appointmentId: string;
}

const DetailsAppointmentModal = ({ appointmentId }: DetailsAppointmentModalProps) => {
  const router = useRouter();
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const [modalLoading, setModalLoading] = useState(true);
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
  }, [appointmentId]);

  useEffect(() => {
    if (details) {
      setModalLoading(false);
    }
  }, [details]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeAllModals());
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const onViewProfileClick = useCallback(() => {
    if (details && details.patient.id) {
      router.push(`/patient-emr/details/${details.patient.id}/profile`);
      onClose();
    }
  }, [onClose, details, router]);

  return (
    <BaseModal
      isLoading={modalLoading}
      dataCy={CypressIds.MODAL_APPOINTMENTS_DETAILS_POPUP}
      title={t(Translation.MODAL_APPOINTMENTS_DETAILS_TITLE)}
      onClose={onClose}
    >
      <Grid>
        <DialogContent sx={{ p: 1.5 }}>
          <Grid container spacing={3}>
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_APPOINTMENT_TYPE)}
              body={details?.serviceType?.title}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_PATIENT)}
              body={details?.patient?.name}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_DESCRIPTION)}
              body={details?.appointment.description}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_DATE_START_TIME)}
              body={details?.appointment.date ? DateUtil.formatFullDate(details?.appointment.date) : '-'}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_STATUS)}
              body={AppointmentStatus[details?.appointment.status as AppointmentStatusEnumKey]}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_REASON)}
              body={details?.appointment.cancellationReason}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <StyledButton
                  data-cy={CypressIds.MODAL_APPOINTMENTS_DETAILS_BUTTON_VIEW}
                  onClick={onViewProfileClick}
                  variant="contained"
                >
                  {t(Translation.MODAL_APPOINTMENTS_DETAILS_BUTTON_VIEW)}
                </StyledButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </BaseModal>
  );
};

export default DetailsAppointmentModal;
