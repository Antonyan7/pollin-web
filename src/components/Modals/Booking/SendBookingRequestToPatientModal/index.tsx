import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PatientId from '@components/Modals/Booking/AddAppointmentModal/fields/PatientId';
import ServiceType from '@components/Modals/Booking/AddAppointmentModal/fields/ServiceType';
import { ISendBookingRequestFormValues } from '@components/Modals/Booking/SendBookingRequestToPatientModal/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { CloseOutlined } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { sendBookingRequestValidationSchema } from 'validation/appointments/send_booking_request';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const SendBookingRequestToPatientModal = () => {
  const [t] = useTranslation();
  const isBookingRequestToPatientLoading = useAppSelector(patientsSelector.isBookingRequestToPatientLoading);

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      serviceTypeId: '',
      patientId: ''
    },
    resolver: yupResolver(sendBookingRequestValidationSchema)
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback((values: ISendBookingRequestFormValues) => {
    dispatch(patientsMiddleware.sendBookingRequestToPatient(values));
  }, []);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.SendBookingRequestToPatientModal));
  }, []);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceTypes());
  }, []);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle sx={{ padding: `${paddings.top24} ${paddings.right24} ${paddings.bottom0} ${paddings.left32}` }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">{t(Translation.MODAL_SEND_BOOKING_REQUEST_TO_PATIENT_TITLE)}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: margins.top24 }} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={{ margin: `${margins.top16} ${margins.right8} ${margins.bottom16} ${margins.left8}` }}>
              <Grid container direction="column" spacing={3}>
                <ServiceType isProviderRequired={false} />
                <PatientId />
              </Grid>
            </DialogContent>

            <Box
              sx={{ borderBottom: 1, borderColor: 'divider', margin: `${margins.topBottom24} ${margins.leftRight0}` }}
            />

            <DialogActions
              sx={{ padding: `${paddings.top0} ${paddings.right24} ${paddings.bottom24} ${paddings.left24}` }}
            >
              <Grid container justifyContent="flex-end">
                <Grid>
                  <ButtonWithLoading
                    isLoading={isBookingRequestToPatientLoading}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    {t(Translation.COMMON_BUTTON_SEND_LABEL)}
                  </ButtonWithLoading>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </FormProvider>
      </Grid>
    </Dialog>
  );
};

export default SendBookingRequestToPatientModal;
