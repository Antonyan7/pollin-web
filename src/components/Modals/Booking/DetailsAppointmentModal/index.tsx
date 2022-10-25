import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { DialogActions, DialogContent, Divider, Grid, Stack } from '@mui/material';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';

import DialogContentRow from '@ui-component/common/DialogContentRow';
import BaseModal from '@ui-component/Modal/BaseModal';
import { convertToLocale } from '@utils/dateUtils';

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
    <BaseModal isLoading={modalLoading} title={t(Translation.MODAL_APPOINTMENTS_DETAILS_TITLE)} onClose={onClose}>
      <Grid>
        <DialogContent>
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
              body={
                timeAdjuster(convertToLocale(details?.appointment.date as string) as string)
                  ?.customizedFullDate as string
              }
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_STATUS)}
              body={details?.appointment.status}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_REASON)}
              body={details?.appointment.cancellationReason}
            />
          </Grid>
        </DialogContent>
        <Divider sx={{ margin: `${margins.topBottom0} ${margins.leftRight24}` }} />
        <DialogActions sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <StyledButton onClick={onViewProfileClick} variant="contained">
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
